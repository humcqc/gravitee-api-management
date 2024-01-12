/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { flatMap } from 'lodash';
import { filter, map, switchMap, takeUntil, tap, shareReplay } from 'rxjs/operators';
import { GIO_DIALOG_WIDTH, GioBannerTypes, GioMenuService } from '@gravitee/ui-particles-angular';
import { combineLatest, Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import {
  ApiConfirmDeploymentDialogComponent,
  ApiConfirmDeploymentDialogData,
  ApiConfirmDeploymentDialogResult,
} from './api-confirm-deployment-dialog/api-confirm-deployment-dialog.component';
import { ApiReviewDialogComponent, ApiReviewDialogData, ApiReviewDialogResult } from './api-review-dialog/api-review-dialog.component';
import { MenuGroupItem, MenuItem } from './MenuGroupItem';
import { ApiV4MenuService } from './api-v4-menu.service';
import { ApiV1V2MenuService } from './api-v1-v2-menu.service';

import { GioPermissionService } from '../../../shared/components/gio-permission/gio-permission.service';
import { Constants } from '../../../entities/Constants';
import { ApiV2Service } from '../../../services-ngx/api-v2.service';
import { Api } from '../../../entities/management-api-v2';
import { ApiService } from '../../../services-ngx/api.service';
import { SnackBarService } from '../../../services-ngx/snack-bar.service';

type TopBanner = {
  title: string;
  body?: string;
  type: GioBannerTypes;
  action?: {
    btnText: string;
    onClick: () => void;
  };
};

@Component({
  selector: 'api-navigation',
  templateUrl: './api-navigation.component.html',
  styleUrls: ['./api-navigation.component.scss'],
  providers: [ApiV1V2MenuService, ApiV4MenuService],
})
export class ApiNavigationComponent implements OnInit, OnDestroy {
  public currentApi: Api;
  public subMenuItems: MenuItem[] = [];
  public groupItems: MenuGroupItem[] = [];
  public selectedItemWithTabs: MenuItem = undefined;
  public bannerState: string;
  public hasBreadcrumb = false;
  public breadcrumbItems: string[] = [];
  public banners$: Observable<TopBanner[]> = combineLatest([
    this.apiV2Service.getLastApiFetch(this.activatedRoute.snapshot.params.apiId),
    this.apiV2Service.verifyDeploy(this.activatedRoute.snapshot.params.apiId),
  ]).pipe(
    map(([api, verifyDeploymentResponse]) => {
      const banners: TopBanner[] = [];

      if (api.definitionVersion == null || api.definitionVersion === 'V1') {
        banners.push({
          title: 'API version out-of-date',
          type: 'warning',
          body:
            '<div>We no longer support path-based APIs. To continue using all features, you will need to update your API.</div>\n' +
            '<a href="https://www.gravitee.io/blog/gravitee-api-definitions" target="_blank" rel="noopener">Learn more</a>\n',
          action: {
            btnText: 'Update API version',
            onClick: () => {
              this.legacyApiService
                .migrateApiToPolicyStudio(this.currentApi.id)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe({
                  error: ({ error }) => {
                    this.snackBarService.error(error.message);
                  },
                });
            },
          },
        });
      }

      const isApiReviewer = this.permissionService.hasAnyMatching(['api-reviews-u']);
      // Only for API reviewer
      if (isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'IN_REVIEW') {
        // 'api-reviews-u'
        banners.push({
          title: 'As an API reviewer, there are some changes made on this API that required a review before been applied.',
          type: 'info',
          action: {
            btnText: 'Review changes',
            onClick: () => {
              this.matDialog
                .open<ApiReviewDialogComponent, ApiReviewDialogData, ApiReviewDialogResult>(ApiReviewDialogComponent, {
                  data: {
                    apiId: api.id,
                  },
                  role: 'alertdialog',
                  id: 'gioApiReviewDialog',
                  width: GIO_DIALOG_WIDTH.MEDIUM,
                })
                .afterClosed()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe();
            },
          },
        });
      }
      if (isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'REVIEW_OK') {
        banners.push({
          title: 'As an API reviewer, you have accepted the changes made on this API.',
          type: 'success',
          action: {
            btnText: 'Review changes',
            onClick: () => {
              this.matDialog
                .open<ApiReviewDialogComponent, ApiReviewDialogData, ApiReviewDialogResult>(ApiReviewDialogComponent, {
                  data: {
                    apiId: api.id,
                  },
                  role: 'alertdialog',
                  id: 'gioApiReviewDialog',
                  width: GIO_DIALOG_WIDTH.MEDIUM,
                })
                .afterClosed()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe();
            },
          },
        });
      }
      if (isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'REQUEST_FOR_CHANGES') {
        banners.push({
          title: 'As an API reviewer, you have rejected the changes made on this API.',
          type: 'warning',
          action: {
            btnText: 'Review changes',
            onClick: () => {
              this.matDialog
                .open<ApiReviewDialogComponent, ApiReviewDialogData, ApiReviewDialogResult>(ApiReviewDialogComponent, {
                  data: {
                    apiId: api.id,
                  },
                  role: 'alertdialog',
                  id: 'gioApiReviewDialog',
                  width: GIO_DIALOG_WIDTH.MEDIUM,
                })
                .afterClosed()
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe();
            },
          },
        });
      }

      // Only for not API reviewer
      if (!isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'IN_REVIEW') {
        // not 'api-reviews-u'
        banners.push({
          title: 'The API reviewer has been asked to review the changes.',
          type: 'info',
        });
      }
      if (!isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'REVIEW_OK') {
        // not 'api-reviews-u'
        banners.push({
          title: 'The API reviewer has accepted the changes made on this API.',
          type: 'success',
        });
      }
      if (!isApiReviewer && this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'REQUEST_FOR_CHANGES') {
        // not 'api-reviews-u'
        banners.push({
          title: 'The API reviewer has asked for changes to be made on this API.',
          type: 'warning',
        });
      }

      // Other banners
      if (this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'DRAFT') {
        banners.push({
          title: 'This API is a draft.',
          type: 'info',
        });
      }

      const apiReviewIsOKOrNotNeeded =
        (this.constants.env.settings?.apiReview?.enabled && api.workflowState === 'REVIEW_OK') ||
        !this.constants.env.settings?.apiReview?.enabled;
      const canUpdateApiDefinition = this.permissionService.hasAnyMatching(['api-definition-u']);
      if (api.deploymentState === 'NEED_REDEPLOY' && apiReviewIsOKOrNotNeeded && verifyDeploymentResponse.ok) {
        banners.push(
          canUpdateApiDefinition
            ? {
                title: 'This API is out of sync.',
                type: 'warning',
                action: {
                  btnText: 'Deploy API',
                  onClick: () => {
                    this.matDialog
                      .open<ApiConfirmDeploymentDialogComponent, ApiConfirmDeploymentDialogData, ApiConfirmDeploymentDialogResult>(
                        ApiConfirmDeploymentDialogComponent,
                        {
                          data: {
                            apiId: api.id,
                          },
                          role: 'alertdialog',
                          id: 'gioApiConfirmDeploymentDialog',
                          width: GIO_DIALOG_WIDTH.MEDIUM,
                        },
                      )
                      .afterClosed()
                      .pipe(takeUntil(this.unsubscribe$))
                      .subscribe();
                  },
                },
              }
            : {
                title: 'This API is out of sync.',
                type: 'warning',
              },
        );
      }

      if (api.lifecycleState === 'DEPRECATED') {
        banners.push({
          title: 'This API is deprecated.',
          type: 'error',
        });
      }

      if (!verifyDeploymentResponse.ok) {
        banners.push({
          title: 'This API cannot be deployed.',
          body: 'The current configuration uses features not in your license.',
          type: 'error',
        });
      }

      return banners;
    }),
    shareReplay(1),
  );
  public hasBanner$ = this.banners$.pipe(map((banners) => banners.length > 0));

  private unsubscribe$ = new Subject();
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly permissionService: GioPermissionService,
    @Inject('Constants') private readonly constants: Constants,
    private readonly gioMenuService: GioMenuService,
    private readonly apiV2Service: ApiV2Service,
    private readonly legacyApiService: ApiService,
    private readonly matDialog: MatDialog,
    private readonly apiNgV1V2MenuService: ApiV1V2MenuService,
    private readonly apiNgV4MenuService: ApiV4MenuService,
    private readonly snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
    this.gioMenuService.reduced$.pipe(takeUntil(this.unsubscribe$)).subscribe((reduced) => {
      this.hasBreadcrumb = reduced;
    });

    this.bannerState = localStorage.getItem('gv-api-navigation-banner');

    this.apiV2Service
      .getLastApiFetch(this.activatedRoute.snapshot.params.apiId)
      .pipe(
        tap((api) => (this.currentApi = api)),
        tap((api) => {
          const menu = api.definitionVersion !== 'V4' ? this.apiNgV1V2MenuService.getMenu(api) : this.apiNgV4MenuService.getMenu(api);
          this.groupItems = menu.groupItems;
          this.subMenuItems = menu.subMenuItems;

          this.breadcrumbItems = this.computeBreadcrumbItems();
          this.selectedItemWithTabs = this.findMenuItemWithTabs();
        }),
        switchMap(() => this.router.events),
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event),
        tap(() => {
          this.selectedItemWithTabs = this.findMenuItemWithTabs();
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
  private findMenuItemWithTabs(): MenuItem {
    let item: MenuItem = this.findActiveMenuItem(this.subMenuItems);
    if (item) {
      return item;
    }

    for (const groupItem of this.groupItems) {
      item = this.findActiveMenuItem(groupItem.items);
      if (item) {
        return item;
      }
    }
  }

  private findActiveMenuItem(items: MenuItem[]) {
    return items.filter((item) => item.tabs).find((item) => this.isTabActive(item.tabs));
  }

  isActive(item: MenuItem): boolean {
    if (!item.routerLink) {
      return false;
    }
    return this.router.isActive(this.router.createUrlTree([item.routerLink], { relativeTo: this.activatedRoute }), {
      paths: item.routerLinkActiveOptions?.exact ? 'exact' : 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  isTabActive(tabs: MenuItem[]): boolean {
    return flatMap(tabs, (tab) => tab).some((tab) => this.isActive(tab));
  }

  public computeBreadcrumbItems(): string[] {
    const breadcrumbItems: string[] = [];

    this.groupItems.forEach((groupItem) => {
      groupItem.items.forEach((item) => {
        if (this.isActive(item)) {
          breadcrumbItems.push(groupItem.title);
          breadcrumbItems.push(item.displayName);
        } else if (item.tabs && this.isTabActive(item.tabs)) {
          breadcrumbItems.push(groupItem.title);
          breadcrumbItems.push(item.displayName);
        }
      });
    });

    return breadcrumbItems;
  }
}
