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
/**
 * 
 * @export
 * @interface UpdateQualityRuleEntity
 */
export interface UpdateQualityRuleEntity {
    /**
     * 
     * @type {string}
     * @memberof UpdateQualityRuleEntity
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQualityRuleEntity
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQualityRuleEntity
     */
    description: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateQualityRuleEntity
     */
    weight?: number;
    /**
     * 
     * @type {boolean}
     * @memberof UpdateQualityRuleEntity
     */
    enabled?: boolean;
}

export function UpdateQualityRuleEntityFromJSON(json: any): UpdateQualityRuleEntity {
    return UpdateQualityRuleEntityFromJSONTyped(json, false);
}

export function UpdateQualityRuleEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateQualityRuleEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': json['name'],
        'description': json['description'],
        'weight': !exists(json, 'weight') ? undefined : json['weight'],
        'enabled': !exists(json, 'enabled') ? undefined : json['enabled'],
    };
}

export function UpdateQualityRuleEntityToJSON(value?: UpdateQualityRuleEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'description': value.description,
        'weight': value.weight,
        'enabled': value.enabled,
    };
}


