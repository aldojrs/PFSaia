import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../material/material.module';
import es from '@angular/common/locales/es';
import esAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from '../core/store';
import { SharedModule } from '../shared/shared.module';

registerLocaleData(es);
registerLocaleData(esAR);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MaterialModule,
        HttpClientModule,
        SharedModule,
        StoreModule.forRoot(appReducers, {}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        EffectsModule.forRoot([]),
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'es-AR',
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
