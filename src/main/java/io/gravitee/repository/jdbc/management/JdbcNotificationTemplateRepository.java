/**
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
package io.gravitee.repository.jdbc.management;

import io.gravitee.repository.exceptions.TechnicalException;
import io.gravitee.repository.jdbc.orm.JdbcObjectMapper;
import io.gravitee.repository.management.api.NotificationTemplateRepository;
import io.gravitee.repository.management.model.NotificationTemplate;
import io.gravitee.repository.management.model.NotificationTemplateReferenceType;
import io.gravitee.repository.management.model.NotificationTemplateType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Types;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author Florent CHAMFROY (florent.chamfroy at graviteesource.com) 
 * @author GraviteeSource Team
 */
@Repository
public class JdbcNotificationTemplateRepository extends JdbcAbstractCrudRepository<NotificationTemplate, String> implements NotificationTemplateRepository {

    @Autowired
    protected JdbcTemplate jdbcTemplate;

    private static final Logger LOGGER = LoggerFactory.getLogger(JdbcNotificationTemplateRepository.class);

    private static final JdbcObjectMapper ORM = JdbcObjectMapper.builder(NotificationTemplate.class, "notification_templates", "id")
            .addColumn("id", Types.NVARCHAR, String.class)
            .addColumn("hook", Types.NVARCHAR, String.class)
            .addColumn("scope", Types.NVARCHAR, String.class)
            .addColumn("reference_id", Types.NVARCHAR, String.class)
            .addColumn("reference_type", Types.NVARCHAR, NotificationTemplateReferenceType.class)
            .addColumn("name", Types.NVARCHAR, String.class)
            .addColumn("description", Types.NVARCHAR, String.class)
            .addColumn("title", Types.NVARCHAR, String.class)
            .addColumn("content", Types.NVARCHAR, String.class)
            .addColumn("type", Types.NVARCHAR, NotificationTemplateType.class)
            .addColumn("created_at", Types.TIMESTAMP, Date.class)
            .addColumn("updated_at", Types.TIMESTAMP, Date.class)
            .addColumn("enabled", Types.BOOLEAN, boolean.class)
            .build();

    @Override
    protected JdbcObjectMapper getOrm() {
        return ORM;
    }

    @Override
    protected String getId(NotificationTemplate item) {
        return item.getId();
    }

    @Override
    public Set<NotificationTemplate> findByTypeAndReferenceIdAndReferenceType(NotificationTemplateType type, String referenceId, NotificationTemplateReferenceType referenceType) throws TechnicalException {
        LOGGER.debug("JdbcNotificationTemplateRepository.findAllByType({}, {}, {})", type, referenceId, referenceType);
        try {
            List<NotificationTemplate> notificationTemplates = jdbcTemplate.query(
                    "select * from notification_templates where type = ? and reference_id = ? and reference_type = ?",
                    ORM.getRowMapper(),
                    type.name(),
                    referenceId,
                    referenceType.name()
            );
            return new HashSet<>(notificationTemplates);
        } catch (final Exception ex) {
            LOGGER.error("Failed to find notificationTemplates by type and refs:", ex);
            throw new TechnicalException("Failed to find notificationTemplates by type and refs", ex);
        }
    }

    @Override
    public Set<NotificationTemplate> findAllByReferenceIdAndReferenceType(String referenceId, NotificationTemplateReferenceType referenceType) throws TechnicalException {
        LOGGER.debug("JdbcNotificationTemplateRepository.findAllByReferenceIdAndReferenceType({}, {})", referenceId, referenceType);
        try {
            List<NotificationTemplate> notificationTemplates = jdbcTemplate.query(
                    "select * from notification_templates where reference_id = ? and reference_type = ?",
                    ORM.getRowMapper(),
                    referenceId,
                    referenceType.name()
            );
            return new HashSet<>(notificationTemplates);
        } catch (final Exception ex) {
            LOGGER.error("Failed to find notificationTemplates by refs:", ex);
            throw new TechnicalException("Failed to find notificationTemplates by refs", ex);
        }
    }

    @Override
    public Set<NotificationTemplate> findByHookAndScopeAndReferenceIdAndReferenceType(String hook, String scope, String referenceId, NotificationTemplateReferenceType referenceType) throws TechnicalException {
        LOGGER.debug("JdbcNotificationTemplateRepository.findByHookReferenceIdAndReferenceType({}, {}, {})", hook, referenceId, referenceType);
        try {
            List<NotificationTemplate> notificationTemplates = jdbcTemplate.query(
                    "select * from notification_templates where hook = ? and scope = ? and reference_id = ? and reference_type = ?",
                    ORM.getRowMapper(),
                    hook,
                    scope,
                    referenceId,
                    referenceType.name()
            );
            return new HashSet<>(notificationTemplates);
        } catch (final Exception ex) {
            LOGGER.error("Failed to find notificationTemplates by refs:", ex);
            throw new TechnicalException("Failed to find notificationTemplates by refs", ex);
        }
    }
}