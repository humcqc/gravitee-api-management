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
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private readonly defaultSnackBarOptions: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'end',
  };

  constructor(private readonly matSnackBar: MatSnackBar) {}

  success(message: string, undoAction?: string) {
    return this.matSnackBar.open(message, undoAction, {
      ...this.defaultSnackBarOptions,
      panelClass: 'gio-snack-bar-success',
    });
  }

  error(message: string) {
    return this.matSnackBar.open(message, 'Close', {
      ...this.defaultSnackBarOptions,
      duration: undefined,
      panelClass: 'gio-snack-bar-error',
    });
  }
}
