import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSelectModule, MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [],
  exports: [
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
