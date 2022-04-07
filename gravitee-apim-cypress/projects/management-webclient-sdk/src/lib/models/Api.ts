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
    User,
    UserFromJSON,
    UserFromJSONTyped,
    UserToJSON,
} from './';

/**
 * 
 * @export
 * @interface Api
 */
export interface Api {
    /**
     * 
     * @type {string}
     * @memberof Api
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof Api
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Api
     */
    version?: string;
    /**
     * 
     * @type {User}
     * @memberof Api
     */
    owner?: User;
}

export function ApiFromJSON(json: any): Api {
    return ApiFromJSONTyped(json, false);
}

export function ApiFromJSONTyped(json: any, ignoreDiscriminator: boolean): Api {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'owner': !exists(json, 'owner') ? undefined : UserFromJSON(json['owner']),
    };
}

export function ApiToJSON(value?: Api | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'name': value.name,
        'version': value.version,
        'owner': UserToJSON(value.owner),
    };
}


