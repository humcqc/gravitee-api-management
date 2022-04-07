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
    ApiEntrypointEntity,
    ApiEntrypointEntityFromJSON,
    ApiEntrypointEntityFromJSONTyped,
    ApiEntrypointEntityToJSON,
    ApiLifecycleState,
    ApiLifecycleStateFromJSON,
    ApiLifecycleStateFromJSONTyped,
    ApiLifecycleStateToJSON,
    Flow,
    FlowFromJSON,
    FlowFromJSONTyped,
    FlowToJSON,
    HttpRequest,
    HttpRequestFromJSON,
    HttpRequestFromJSONTyped,
    HttpRequestToJSON,
    HttpResponse,
    HttpResponseFromJSON,
    HttpResponseFromJSONTyped,
    HttpResponseToJSON,
    Plan,
    PlanFromJSON,
    PlanFromJSONTyped,
    PlanToJSON,
    PrimaryOwnerEntity,
    PrimaryOwnerEntityFromJSON,
    PrimaryOwnerEntityFromJSONTyped,
    PrimaryOwnerEntityToJSON,
    Property,
    PropertyFromJSON,
    PropertyFromJSONTyped,
    PropertyToJSON,
    Proxy,
    ProxyFromJSON,
    ProxyFromJSONTyped,
    ProxyToJSON,
    Resource,
    ResourceFromJSON,
    ResourceFromJSONTyped,
    ResourceToJSON,
    ResponseTemplate,
    ResponseTemplateFromJSON,
    ResponseTemplateFromJSONTyped,
    ResponseTemplateToJSON,
    Rule,
    RuleFromJSON,
    RuleFromJSONTyped,
    RuleToJSON,
    Services,
    ServicesFromJSON,
    ServicesFromJSONTyped,
    ServicesToJSON,
    Visibility,
    VisibilityFromJSON,
    VisibilityFromJSONTyped,
    VisibilityToJSON,
    WorkflowState,
    WorkflowStateFromJSON,
    WorkflowStateFromJSONTyped,
    WorkflowStateToJSON,
} from './';

/**
 * 
 * @export
 * @interface DebugApiEntity
 */
export interface DebugApiEntity {
    /**
     * API's uuid.
     * @type {string}
     * @memberof DebugApiEntity
     */
    id?: string;
    /**
     * API's crossId. Identifies API across environments.
     * @type {string}
     * @memberof DebugApiEntity
     */
    crossId?: string;
    /**
     * API's name. Duplicate names can exists.
     * @type {string}
     * @memberof DebugApiEntity
     */
    name?: string;
    /**
     * Api's version. It's a simple string only used in the portal.
     * @type {string}
     * @memberof DebugApiEntity
     */
    version?: string;
    /**
     * API's description. A short description of your API.
     * @type {string}
     * @memberof DebugApiEntity
     */
    description?: string;
    /**
     * API's groups. Used to add team in your API.
     * @type {Array<string>}
     * @memberof DebugApiEntity
     */
    groups?: Array<string>;
    /**
     * 
     * @type {Visibility}
     * @memberof DebugApiEntity
     */
    visibility?: Visibility;
    /**
     * The status of the API regarding the gateway.
     * @type {string}
     * @memberof DebugApiEntity
     */
    state?: DebugApiEntityStateEnum;
    /**
     * the list of sharding tags associated with this API.
     * @type {Array<string>}
     * @memberof DebugApiEntity
     */
    tags?: Array<string>;
    /**
     * the API logo encoded in base64
     * @type {string}
     * @memberof DebugApiEntity
     */
    picture?: string;
    /**
     * the list of categories associated with this API
     * @type {Array<string>}
     * @memberof DebugApiEntity
     */
    categories?: Array<string>;
    /**
     * the free list of labels associated with this API
     * @type {Array<string>}
     * @memberof DebugApiEntity
     */
    labels?: Array<string>;
    /**
     * 
     * @type {Array<ApiEntrypointEntity>}
     * @memberof DebugApiEntity
     */
    entrypoints?: Array<ApiEntrypointEntity>;
    /**
     * the API background encoded in base64
     * @type {string}
     * @memberof DebugApiEntity
     */
    background?: string;
    /**
     * 
     * @type {HttpRequest}
     * @memberof DebugApiEntity
     */
    request?: HttpRequest;
    /**
     * 
     * @type {HttpResponse}
     * @memberof DebugApiEntity
     */
    response?: HttpResponse;
    /**
     * API's context path.
     * @type {string}
     * @memberof DebugApiEntity
     */
    context_path?: string;
    /**
     * 
     * @type {Proxy}
     * @memberof DebugApiEntity
     */
    proxy: Proxy;
    /**
     * API's flow mode.
     * @type {string}
     * @memberof DebugApiEntity
     */
    flow_mode?: DebugApiEntityFlowModeEnum;
    /**
     * a map where you can associate a path to a configuration (the policies configuration)
     * @type {{ [key: string]: Array<Rule>; }}
     * @memberof DebugApiEntity
     */
    paths: { [key: string]: Array<Rule>; };
    /**
     * a list of flows (the policies configuration)
     * @type {Array<Flow>}
     * @memberof DebugApiEntity
     */
    flows: Array<Flow>;
    /**
     * a list of plans with flows (the policies configuration)
     * @type {Array<Plan>}
     * @memberof DebugApiEntity
     */
    plans: Array<Plan>;
    /**
     * API's gravitee definition version
     * @type {string}
     * @memberof DebugApiEntity
     */
    gravitee?: string;
    /**
     * The last date (as timestamp) when the API was deployed.
     * @type {Date}
     * @memberof DebugApiEntity
     */
    deployed_at?: Date;
    /**
     * The date (as a timestamp) when the API was created.
     * @type {Date}
     * @memberof DebugApiEntity
     */
    created_at?: Date;
    /**
     * The last date (as a timestamp) when the API was updated.
     * @type {Date}
     * @memberof DebugApiEntity
     */
    updated_at?: Date;
    /**
     * 
     * @type {PrimaryOwnerEntity}
     * @memberof DebugApiEntity
     */
    owner?: PrimaryOwnerEntity;
    /**
     * A dictionary (could be dynamic) of properties available in the API context.
     * @type {Array<Property>}
     * @memberof DebugApiEntity
     */
    properties?: Array<Property>;
    /**
     * 
     * @type {Services}
     * @memberof DebugApiEntity
     */
    services?: Services;
    /**
     * the API logo url.
     * @type {string}
     * @memberof DebugApiEntity
     */
    picture_url?: string;
    /**
     * The list of API resources used by policies like cache resources or oauth2
     * @type {Array<Resource>}
     * @memberof DebugApiEntity
     */
    resources?: Array<Resource>;
    /**
     * A list of paths used to aggregate data in analytics
     * @type {Array<string>}
     * @memberof DebugApiEntity
     */
    path_mappings?: Array<string>;
    /**
     * A map that allows you to configure the output of a request based on the event throws by the gateway. Example : Quota exceeded, api-ky is missing, ...
     * @type {{ [key: string]: { [key: string]: ResponseTemplate; }; }}
     * @memberof DebugApiEntity
     */
    response_templates?: { [key: string]: { [key: string]: ResponseTemplate; }; };
    /**
     * 
     * @type {ApiLifecycleState}
     * @memberof DebugApiEntity
     */
    lifecycle_state?: ApiLifecycleState;
    /**
     * 
     * @type {WorkflowState}
     * @memberof DebugApiEntity
     */
    workflow_state?: WorkflowState;
    /**
     * 
     * @type {boolean}
     * @memberof DebugApiEntity
     */
    disable_membership_notifications?: boolean;
    /**
     * the API background url.
     * @type {string}
     * @memberof DebugApiEntity
     */
    background_url?: string;
}

export function DebugApiEntityFromJSON(json: any): DebugApiEntity {
    return DebugApiEntityFromJSONTyped(json, false);
}

export function DebugApiEntityFromJSONTyped(json: any, ignoreDiscriminator: boolean): DebugApiEntity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'crossId': !exists(json, 'crossId') ? undefined : json['crossId'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'version': !exists(json, 'version') ? undefined : json['version'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'groups': !exists(json, 'groups') ? undefined : json['groups'],
        'visibility': !exists(json, 'visibility') ? undefined : VisibilityFromJSON(json['visibility']),
        'state': !exists(json, 'state') ? undefined : json['state'],
        'tags': !exists(json, 'tags') ? undefined : json['tags'],
        'picture': !exists(json, 'picture') ? undefined : json['picture'],
        'categories': !exists(json, 'categories') ? undefined : json['categories'],
        'labels': !exists(json, 'labels') ? undefined : json['labels'],
        'entrypoints': !exists(json, 'entrypoints') ? undefined : ((json['entrypoints'] as Array<any>).map(ApiEntrypointEntityFromJSON)),
        'background': !exists(json, 'background') ? undefined : json['background'],
        'request': !exists(json, 'request') ? undefined : HttpRequestFromJSON(json['request']),
        'response': !exists(json, 'response') ? undefined : HttpResponseFromJSON(json['response']),
        'context_path': !exists(json, 'context_path') ? undefined : json['context_path'],
        'proxy': ProxyFromJSON(json['proxy']),
        'flow_mode': !exists(json, 'flow_mode') ? undefined : json['flow_mode'],
        'paths': json['paths'],
        'flows': ((json['flows'] as Array<any>).map(FlowFromJSON)),
        'plans': ((json['plans'] as Array<any>).map(PlanFromJSON)),
        'gravitee': !exists(json, 'gravitee') ? undefined : json['gravitee'],
        'deployed_at': !exists(json, 'deployed_at') ? undefined : (new Date(json['deployed_at'])),
        'created_at': !exists(json, 'created_at') ? undefined : (new Date(json['created_at'])),
        'updated_at': !exists(json, 'updated_at') ? undefined : (new Date(json['updated_at'])),
        'owner': !exists(json, 'owner') ? undefined : PrimaryOwnerEntityFromJSON(json['owner']),
        'properties': !exists(json, 'properties') ? undefined : ((json['properties'] as Array<any>).map(PropertyFromJSON)),
        'services': !exists(json, 'services') ? undefined : ServicesFromJSON(json['services']),
        'picture_url': !exists(json, 'picture_url') ? undefined : json['picture_url'],
        'resources': !exists(json, 'resources') ? undefined : ((json['resources'] as Array<any>).map(ResourceFromJSON)),
        'path_mappings': !exists(json, 'path_mappings') ? undefined : json['path_mappings'],
        'response_templates': !exists(json, 'response_templates') ? undefined : json['response_templates'],
        'lifecycle_state': !exists(json, 'lifecycle_state') ? undefined : ApiLifecycleStateFromJSON(json['lifecycle_state']),
        'workflow_state': !exists(json, 'workflow_state') ? undefined : WorkflowStateFromJSON(json['workflow_state']),
        'disable_membership_notifications': !exists(json, 'disable_membership_notifications') ? undefined : json['disable_membership_notifications'],
        'background_url': !exists(json, 'background_url') ? undefined : json['background_url'],
    };
}

export function DebugApiEntityToJSON(value?: DebugApiEntity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'crossId': value.crossId,
        'name': value.name,
        'version': value.version,
        'description': value.description,
        'groups': value.groups,
        'visibility': VisibilityToJSON(value.visibility),
        'state': value.state,
        'tags': value.tags,
        'picture': value.picture,
        'categories': value.categories,
        'labels': value.labels,
        'entrypoints': value.entrypoints === undefined ? undefined : ((value.entrypoints as Array<any>).map(ApiEntrypointEntityToJSON)),
        'background': value.background,
        'request': HttpRequestToJSON(value.request),
        'response': HttpResponseToJSON(value.response),
        'context_path': value.context_path,
        'proxy': ProxyToJSON(value.proxy),
        'flow_mode': value.flow_mode,
        'paths': value.paths,
        'flows': ((value.flows as Array<any>).map(FlowToJSON)),
        'plans': ((value.plans as Array<any>).map(PlanToJSON)),
        'gravitee': value.gravitee,
        'deployed_at': value.deployed_at === undefined ? undefined : (value.deployed_at.toISOString()),
        'created_at': value.created_at === undefined ? undefined : (value.created_at.toISOString()),
        'updated_at': value.updated_at === undefined ? undefined : (value.updated_at.toISOString()),
        'owner': PrimaryOwnerEntityToJSON(value.owner),
        'properties': value.properties === undefined ? undefined : ((value.properties as Array<any>).map(PropertyToJSON)),
        'services': ServicesToJSON(value.services),
        'picture_url': value.picture_url,
        'resources': value.resources === undefined ? undefined : ((value.resources as Array<any>).map(ResourceToJSON)),
        'path_mappings': value.path_mappings,
        'response_templates': value.response_templates,
        'lifecycle_state': ApiLifecycleStateToJSON(value.lifecycle_state),
        'workflow_state': WorkflowStateToJSON(value.workflow_state),
        'disable_membership_notifications': value.disable_membership_notifications,
        'background_url': value.background_url,
    };
}

/**
* @export
* @enum {string}
*/
export enum DebugApiEntityStateEnum {
    INITIALIZED = 'INITIALIZED',
    STOPPED = 'STOPPED',
    STOPPING = 'STOPPING',
    STARTED = 'STARTED',
    CLOSED = 'CLOSED'
}
/**
* @export
* @enum {string}
*/
export enum DebugApiEntityFlowModeEnum {
    DEFAULT = 'DEFAULT',
    BESTMATCH = 'BEST_MATCH'
}


