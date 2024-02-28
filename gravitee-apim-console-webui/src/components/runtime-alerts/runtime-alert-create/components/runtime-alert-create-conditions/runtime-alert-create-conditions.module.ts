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
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GioBannerModule } from '@gravitee/ui-particles-angular';
import { ReactiveFormsModule } from '@angular/forms';

import { RuntimeAlertCreateConditionsComponent } from './runtime-alert-create-conditions.component';

import { RuntimeAlertCreateConditionModule } from '../components/runtime-alert-create-condition.module';

@NgModule({
  declarations: [RuntimeAlertCreateConditionsComponent],
  exports: [RuntimeAlertCreateConditionsComponent],
  imports: [CommonModule, GioBannerModule, RuntimeAlertCreateConditionModule, ReactiveFormsModule],
})
export class RuntimeAlertCreateConditionsModule {}
