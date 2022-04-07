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
    Projection,
    ProjectionFromJSON,
    ProjectionFromJSONTyped,
    ProjectionToJSON,
} from './';

import {
     AggregationConditionFromJSONTyped,
     CompareConditionFromJSONTyped,
     MissingDataConditionFromJSONTyped,
     RateConditionFromJSONTyped,
     StringCompareConditionFromJSONTyped,
     StringConditionFromJSONTyped,
     ThresholdConditionFromJSONTyped,
     ThresholdRangeConditionFromJSONTyped
} from './';

/**
 * 
 * @export
 * @interface Condition
 */
export interface Condition {
    /**
     * 
     * @type {string}
     * @memberof Condition
     */
    type?: ConditionTypeEnum;
    /**
     * 
     * @type {Array<Projection>}
     * @memberof Condition
     */
    projections?: Array<Projection>;
}

export function ConditionFromJSON(json: any): Condition {
    return ConditionFromJSONTyped(json, false);
}

export function ConditionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Condition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    if (!ignoreDiscriminator) {
        if (json['type'] === 'AggregationCondition') {
            return AggregationConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'CompareCondition') {
            return CompareConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'MissingDataCondition') {
            return MissingDataConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'RateCondition') {
            return RateConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'StringCompareCondition') {
            return StringCompareConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'StringCondition') {
            return StringConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'ThresholdCondition') {
            return ThresholdConditionFromJSONTyped(json, true);
        }
        if (json['type'] === 'ThresholdRangeCondition') {
            return ThresholdRangeConditionFromJSONTyped(json, true);
        }
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'projections': !exists(json, 'projections') ? undefined : ((json['projections'] as Array<any>).map(ProjectionFromJSON)),
    };
}

export function ConditionToJSON(value?: Condition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'projections': value.projections === undefined ? undefined : ((value.projections as Array<any>).map(ProjectionToJSON)),
    };
}

/**
* @export
* @enum {string}
*/
export enum ConditionTypeEnum {
    STRING = 'STRING',
    THRESHOLD = 'THRESHOLD',
    THRESHOLDRANGE = 'THRESHOLD_RANGE',
    RATE = 'RATE',
    FREQUENCY = 'FREQUENCY',
    AGGREGATION = 'AGGREGATION',
    COMPARE = 'COMPARE',
    STRINGCOMPARE = 'STRING_COMPARE',
    MISSINGDATA = 'MISSING_DATA'
}


