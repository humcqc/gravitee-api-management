/*
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
export interface Flow {
  name?: string;
  enabled?: boolean;
  selectors?: FlowSelector[]; // To Complete when needed
  request?: FlowStep[];
  response?: FlowStep[];
  subscribe?: FlowStep[];
  publish?: FlowStep[];
  tags?: string[];
}

export interface FlowStep {
  name?: string;
  description?: string;
  enabled?: boolean;
  policy?: string;
  configuration?: string;
  condition?: string;
  messageCondition?: string;
}

/**
 * Selectors
 */

export type SelectorType = 'http' | 'channel' | 'condition';
export type FlowSelector = HttpSelector | ChannelSelector | ConditionSelector;
export type HttpMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE' | 'OTHER';
export type OperationsEnum = 'PUBLISH' | 'SUBSCRIBE';
export type Operator = 'EQUALS' | 'STARTS_WITH';

export interface HttpSelector extends BaseSelector {
  /**
   * The path of the selector
   */
  path: string;
  pathOperator: Operator;
  methods?: HttpMethod[];
}

export interface ChannelSelector extends BaseSelector {
  /**
   * The list of operations associated with this channel selector.
   */
  operations?: OperationsEnum[];
  /**
   * The channel of the selector
   */
  channel: string;
  channelOperator: Operator;
  entrypoints?: string[];
}

export interface ConditionSelector extends BaseSelector {
  /**
   * The condition of the selector
   */
  condition: string;
}

interface BaseSelector {
  /**
   * Selector type.
   */
  type?: SelectorType;
}
