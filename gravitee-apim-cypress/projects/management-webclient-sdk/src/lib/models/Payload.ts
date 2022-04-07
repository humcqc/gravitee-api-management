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
 * @interface Payload
 */
export interface Payload {
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    clientId: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    redirectUri: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    code: string;
    /**
     * 
     * @type {string}
     * @memberof Payload
     */
    state?: string;
}

export function PayloadFromJSON(json: any): Payload {
    return PayloadFromJSONTyped(json, false);
}

export function PayloadFromJSONTyped(json: any, ignoreDiscriminator: boolean): Payload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'clientId': json['clientId'],
        'redirectUri': json['redirectUri'],
        'code': json['code'],
        'state': !exists(json, 'state') ? undefined : json['state'],
    };
}

export function PayloadToJSON(value?: Payload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'clientId': value.clientId,
        'redirectUri': value.redirectUri,
        'code': value.code,
        'state': value.state,
    };
}


