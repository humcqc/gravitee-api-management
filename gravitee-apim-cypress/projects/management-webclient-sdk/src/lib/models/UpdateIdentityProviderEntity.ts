/* tslint:disable */
/* eslint-disable */
/**
 * Gravitee.io - Management API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.18.0-SNAPSHOT
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    GroupMappingEntity,
    GroupMappingEntityFromJSON,
    GroupMappingEntityFromJSONTyped,
    GroupMappingEntityToJSON,
    RoleMappingEntity,
    RoleMappingEntityFromJSON,
    RoleMappingEntityFromJSONTyped,
    RoleMappingEntityToJSON,
} from './';

/**
 * 
 * @export
 * @interface UpdateIdentityProviderEntity
 */
export interface UpdateIdentityProviderEntity {
    /**
     * 
     * @type {string}
     * @memberof UpdateIdentityProviderEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateIdentityProviderEntity
     */
    description?: string;
    /**
     * 
     * @type {{ [key: string]: object; }}
     * @memberof UpdateIdentityProviderEntity
     */
    _configuration: { [key: string]: object; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdateIdentityProviderEntity
     */
    enabled: boolean;
    /**
     * 
     * @type {Array<GroupMappingEntity>}
     * @memberof UpdateIdentityProviderEntity
     */
    groupMappings?: Array<GroupMappingEntity>;
    /**
     * 
     * @type {Array<RoleMappingEntity>}
     * @memberof UpdateIdentityProviderEntity
     */
    roleMappings?: Array<RoleMappingEntity>;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof UpdateIdentityProviderEntity
     */
    userProfileMapping?: { [key: string]: string; };
    /**
     * 
     * @type {boolean}
     * @memberof UpdateIdentityProviderEntity
     */
    emailRequired?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateIdentityProviderEntity
     */
    syncMappings?: boolean;
}

export function UpdateIdentityProviderEntityFromJSON(json: any): UpdateIdentityProviderEntity {
    return UpdateIdentityProviderEntityFromJSONTyped(json, false);
}

export function UpdateIdentityProviderEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateIdentityProviderEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        '_configuration': json['configuration'],
        'enabled': json['enabled'],
        'groupMappings': !exists(json, 'groupMappings') ? undefined : ((json['groupMappings'] as Array<any>).map(GroupMappingEntityFromJSON)),
        'roleMappings': !exists(json, 'roleMappings') ? undefined : ((json['roleMappings'] as Array<any>).map(RoleMappingEntityFromJSON)),
        'userProfileMapping': !exists(json, 'userProfileMapping') ? undefined : json['userProfileMapping'],
        'emailRequired': !exists(json, 'emailRequired') ? undefined : json['emailRequired'],
        'syncMappings': !exists(json, 'syncMappings') ? undefined : json['syncMappings'],
    };
}

export function UpdateIdentityProviderEntityToJSON(value?: UpdateIdentityProviderEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'description': value.description,
        'configuration': value._configuration,
        'enabled': value.enabled,
        'groupMappings': value.groupMappings === undefined ? undefined : ((value.groupMappings as Array<any>).map(GroupMappingEntityToJSON)),
        'roleMappings': value.roleMappings === undefined ? undefined : ((value.roleMappings as Array<any>).map(RoleMappingEntityToJSON)),
        'userProfileMapping': value.userProfileMapping,
        'emailRequired': value.emailRequired,
        'syncMappings': value.syncMappings,
    };
}


