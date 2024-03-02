import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './store/user.reducer';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserFormComponent } from './dialogs/user-form/user-form.component';

@NgModule({
    declarations: [
        UserComponent,
        UserFormComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        UserRoutingModule,
        StoreModule.forFeature(usersFeature),
        EffectsModule.forFeature([UserEffects]),
    ]
})
export class UserModule { }
