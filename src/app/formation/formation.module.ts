import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormationManagement } from './FormationManagement/formation.component';
import { CreateFormationComponent } from './create-formation/create-formation.component';
import { FormationRoutingModule } from './formation.routing.module';
import { UpdateFormationComponent } from './update-formation/update-formation.component';

@NgModule({
  declarations: [CreateFormationComponent,FormationManagement,UpdateFormationComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FormsModule,
    ReactiveFormsModule // add the ReactiveFormsModule here

  ],
  exports: [FormationManagement]
})
export class FormationModule { }
