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
 * @interface ContentDisposition
 */
export interface ContentDisposition {
    /**
     * 
     * @type {string}
     * @memberof ContentDisposition
     */
    type?: string;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof ContentDisposition
     */
    parameters?: { [key: string]: string; };
    /**
     * 
     * @type {string}
     * @memberof ContentDisposition
     */
    fileName?: string;
    /**
     * 
     * @type {Date}
     * @memberof ContentDisposition
     */
    creationDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContentDisposition
     */
    modificationDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof ContentDisposition
     */
    readDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof ContentDisposition
     */
    size?: number;
}

export function ContentDispositionFromJSON(json: any): ContentDisposition {
    return ContentDispositionFromJSONTyped(json, false);
}

export function ContentDispositionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContentDisposition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'parameters': !exists(json, 'parameters') ? undefined : json['parameters'],
        'fileName': !exists(json, 'fileName') ? undefined : json['fileName'],
        'creationDate': !exists(json, 'creationDate') ? undefined : (new Date(json['creationDate'])),
        'modificationDate': !exists(json, 'modificationDate') ? undefined : (new Date(json['modificationDate'])),
        'readDate': !exists(json, 'readDate') ? undefined : (new Date(json['readDate'])),
        'size': !exists(json, 'size') ? undefined : json['size'],
    };
}

export function ContentDispositionToJSON(value?: ContentDisposition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'parameters': value.parameters,
        'fileName': value.fileName,
        'creationDate': value.creationDate === undefined ? undefined : (value.creationDate.toISOString()),
        'modificationDate': value.modificationDate === undefined ? undefined : (value.modificationDate.toISOString()),
        'readDate': value.readDate === undefined ? undefined : (value.readDate.toISOString()),
        'size': value.size,
    };
}


