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


import * as runtime from '../runtime';
import {
    Analytics,
    AnalyticsFromJSON,
    AnalyticsToJSON,
    AnalyticsType,
    AnalyticsTypeFromJSON,
    AnalyticsTypeToJSON,
} from '../models';

export interface GetApplicationAnalyticsHitsRequest {
    type: AnalyticsType;
    application: string;
    envId: string;
    orgId: string;
    from?: number;
    to?: number;
    interval?: number;
    query?: string;
    field?: string;
    size?: number;
    ranges?: Array<string>;
    aggs?: Array<string>;
}

/**
 * 
 */
export class ApplicationAnalyticsApi extends runtime.BaseAPI {

    /**
     * User must have the APPLICATION_ANALYTICS[READ] permission to use this service
     * Get application analytics
     */
    async getApplicationAnalyticsHitsRaw(requestParameters: GetApplicationAnalyticsHitsRequest): Promise<runtime.ApiResponse<Analytics>> {
        if (requestParameters.type === null || requestParameters.type === undefined) {
            throw new runtime.RequiredError('type','Required parameter requestParameters.type was null or undefined when calling getApplicationAnalyticsHits.');
        }

        if (requestParameters.application === null || requestParameters.application === undefined) {
            throw new runtime.RequiredError('application','Required parameter requestParameters.application was null or undefined when calling getApplicationAnalyticsHits.');
        }

        if (requestParameters.envId === null || requestParameters.envId === undefined) {
            throw new runtime.RequiredError('envId','Required parameter requestParameters.envId was null or undefined when calling getApplicationAnalyticsHits.');
        }

        if (requestParameters.orgId === null || requestParameters.orgId === undefined) {
            throw new runtime.RequiredError('orgId','Required parameter requestParameters.orgId was null or undefined when calling getApplicationAnalyticsHits.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.from !== undefined) {
            queryParameters['from'] = requestParameters.from;
        }

        if (requestParameters.to !== undefined) {
            queryParameters['to'] = requestParameters.to;
        }

        if (requestParameters.interval !== undefined) {
            queryParameters['interval'] = requestParameters.interval;
        }

        if (requestParameters.query !== undefined) {
            queryParameters['query'] = requestParameters.query;
        }

        if (requestParameters.field !== undefined) {
            queryParameters['field'] = requestParameters.field;
        }

        if (requestParameters.size !== undefined) {
            queryParameters['size'] = requestParameters.size;
        }

        if (requestParameters.type !== undefined) {
            queryParameters['type'] = requestParameters.type;
        }

        if (requestParameters.ranges) {
            queryParameters['ranges'] = requestParameters.ranges.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.aggs) {
            queryParameters['aggs'] = requestParameters.aggs.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/organizations/{orgId}/environments/{envId}/applications/{application}/analytics`.replace(`{${"application"}}`, encodeURIComponent(String(requestParameters.application))).replace(`{${"envId"}}`, encodeURIComponent(String(requestParameters.envId))).replace(`{${"orgId"}}`, encodeURIComponent(String(requestParameters.orgId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => AnalyticsFromJSON(jsonValue));
    }

    /**
     * User must have the APPLICATION_ANALYTICS[READ] permission to use this service
     * Get application analytics
     */
    async getApplicationAnalyticsHits(requestParameters: GetApplicationAnalyticsHitsRequest): Promise<Analytics> {
        const response = await this.getApplicationAnalyticsHitsRaw(requestParameters);
        return await response.value();
    }

}
