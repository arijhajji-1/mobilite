import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ReservationComponent } from './reservation.component';
import { ReservationRoutingModule } from './reservation.routing.module';

@NgModule({
  declarations: [ReservationComponent],
  imports: [
    CommonModule,
   ReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule // add the ReactiveFormsModule here

  ],
  exports: [ReservationComponent]
})
export class ReservationModule { }
