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

/**
 * 
 * @export
 * @enum {string}
 */
export enum MembershipMemberType {
    USER = 'USER',
    GROUP = 'GROUP'
}

export function MembershipMemberTypeFromJSON(json: any): MembershipMemberType {
    return MembershipMemberTypeFromJSONTyped(json, false);
}

export function MembershipMemberTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): MembershipMemberType {
    return json as MembershipMemberType;
}

export function MembershipMemberTypeToJSON(value?: MembershipMemberType | null): any {
    return value as any;
}

