/*
 * Copyright © 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.gravitee.apim.core.documentation.usecase;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import inmemory.ApiCrudServiceInMemory;
import inmemory.PageCrudServiceInMemory;
import inmemory.PageQueryServiceInMemory;
import io.gravitee.apim.core.api.model.Api;
import io.gravitee.apim.core.documentation.domain_service.ApiDocumentationDomainService;
import io.gravitee.apim.core.documentation.model.Breadcrumb;
import io.gravitee.apim.core.documentation.model.Page;
import io.gravitee.apim.core.exception.DomainException;
import io.gravitee.rest.api.service.exceptions.ApiNotFoundException;
import io.gravitee.rest.api.service.exceptions.PageNotFoundException;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

class ApiGetDocumentationPagesUsecaseTest {

    private final PageQueryServiceInMemory pageQueryService = new PageQueryServiceInMemory();
    private final PageCrudServiceInMemory pageCrudService = new PageCrudServiceInMemory();
    private final ApiCrudServiceInMemory apiCrudService = new ApiCrudServiceInMemory();
    private final ApiGetDocumentationPagesUsecase useCase = new ApiGetDocumentationPagesUsecase(
        new ApiDocumentationDomainService(pageQueryService),
        pageCrudService,
        apiCrudService
    );

    private static final String API_ID = "api-id";

    @AfterEach
    void tearDown() {
        pageQueryService.reset();
        pageCrudService.reset();
        apiCrudService.reset();
    }

    @Nested
    class GetAll {

        @Test
        void should_return_all_pages_for_api() {
            initApiServices(List.of(Api.builder().id(API_ID).build()));
            initPageServices(
                List.of(
                    Page.builder().id("page#1").referenceType(Page.ReferenceType.API).referenceId(API_ID).build(),
                    Page.builder().id("page#2").referenceType(Page.ReferenceType.API).referenceId(API_ID).build()
                )
            );
            var res = useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, null)).pages();
            assertThat(res).hasSize(2);
            assertThat(res.get(0).getId()).isEqualTo("page#1");
            assertThat(res.get(1).getId()).isEqualTo("page#2");
        }

        @Test
        void should_throw_error_if_api_not_found() {
            initApiServices(List.of(Api.builder().id("not-my-api").build()));
            assertThatThrownBy(() -> useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, null)))
                .isInstanceOf(ApiNotFoundException.class);
        }
    }

    @Nested
    class GetRootPage {

        @Test
        void should_return_all_root_pages_for_api_and_no_breadcrumb() {
            initApiServices(List.of(Api.builder().id(API_ID).build()));
            initPageServices(
                List.of(
                    Page.builder().id("page#1").referenceType(Page.ReferenceType.API).referenceId(API_ID).build(),
                    basicPageWithParent("page#2", "not-root"),
                    basicPageWithParent("page#2", "")
                )
            );
            var res = useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, "ROOT"));
            var pages = res.pages();
            assertThat(pages).hasSize(2);
            assertThat(pages.get(0).getId()).isEqualTo("page#1");
            assertThat(pages.get(1).getId()).isEqualTo("page#2");

            assertThat(res.breadcrumbList()).isNotNull().hasSize(0);
        }
    }

    @Nested
    class GetPageByParentId {

        @BeforeEach
        void setUp() {
            initApiServices(List.of(Api.builder().id(API_ID).build()));
        }

        @Test
        void should_return_pages_and_breadcrumb_for_a_parent_id() {
            var parentIdPos1 = "parent-id-pos-1";
            var parentIdPos2 = "parent-id-pos-2";
            var parentIdPos3 = "parent-id-pos-3";

            var resultList = List.of(basicPageWithParent("result-1", parentIdPos3), basicPageWithParent("result-2", parentIdPos3));

            var databasePages = new ArrayList<>(resultList);
            databasePages.add(basicPageWithParent(parentIdPos3, parentIdPos2));
            databasePages.add(basicPageWithParent(parentIdPos2, parentIdPos1));
            databasePages.add(basicPageWithParent(parentIdPos1, ""));

            initPageServices(databasePages);

            var res = useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, parentIdPos3));
            var pages = res.pages();
            assertThat(pages).hasSize(2);
            assertThat(pages.get(0).getId()).isEqualTo("result-1");
            assertThat(pages.get(1).getId()).isEqualTo("result-2");

            assertThat(res.breadcrumbList()).isNotNull().hasSize(3);
            assertThat(res.breadcrumbList().get(0))
                .isNotNull()
                .isEqualTo(Breadcrumb.builder().position(1).id(parentIdPos1).name(parentIdPos1 + "-name").build());

            assertThat(res.breadcrumbList().get(1))
                .isNotNull()
                .isEqualTo(Breadcrumb.builder().position(2).id(parentIdPos2).name(parentIdPos2 + "-name").build());

            assertThat(res.breadcrumbList().get(2))
                .isNotNull()
                .isEqualTo(Breadcrumb.builder().position(3).id(parentIdPos3).name(parentIdPos3 + "-name").build());
        }

        @Test
        void should_throw_error_if_parent_not_found() {
            assertThatThrownBy(() -> useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, "parent-id")))
                .isInstanceOf(PageNotFoundException.class);
        }

        @Test
        void should_throw_error_if_parent_is_not_a_folder() {
            initPageServices(List.of(Page.builder().id("parent-id").type(Page.Type.MARKDOWN).build()));
            assertThatThrownBy(() -> useCase.execute(new ApiGetDocumentationPagesUsecase.Input(API_ID, "parent-id")))
                .isInstanceOf(DomainException.class);
        }
    }

    private void initPageServices(List<Page> pages) {
        pageQueryService.initWith(pages);
        pageCrudService.initWith(pages);
    }

    private void initApiServices(List<Api> apis) {
        apiCrudService.initWith(apis);
    }

    private Page basicPageWithParent(String id, String parentId) {
        return Page
            .builder()
            .id(id)
            .name(id + "-name")
            .referenceType(Page.ReferenceType.API)
            .referenceId(API_ID)
            .parentId(parentId)
            .type(Page.Type.FOLDER)
            .build();
    }
}
