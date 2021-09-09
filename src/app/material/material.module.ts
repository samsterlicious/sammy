import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
  MatToolbarModule,
  ClipboardModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatStepperModule,
  MatButtonModule,
  MatRadioModule,
  MatInputModule,
  MatDialogModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule,
  MatMenuModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
];

@NgModule({
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
