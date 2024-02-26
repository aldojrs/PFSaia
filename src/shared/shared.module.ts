import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullnamePipe } from './fullname.pipe';
import { HeaderFontDirective } from './header-font.directive';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [
        FullnamePipe,
        HeaderFontDirective,
        ConfirmationDialogComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [FullnamePipe, HeaderFontDirective],
})
export class SharedModule { }
