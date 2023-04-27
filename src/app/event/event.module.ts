import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event.routing.module';
import { EventComponent } from './event-management/event-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';

@NgModule({
  declarations: [EventComponent,CreateEventComponent,UpdateEventComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    ReactiveFormsModule // add the ReactiveFormsModule here

  ],
  exports: [EventComponent]
})
export class EventModule { }
