import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from '../material/material.module';
import es from '@angular/common/locales/es';
import esAR from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
