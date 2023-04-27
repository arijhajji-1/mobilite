import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event-management/event-management.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { UpdateEventComponent } from './update-event/update-event.component';


const routes: Routes = [
    {path:'event', component: EventComponent},
    {path:'createEvent',component:CreateEventComponent},
    {path:'updateEvent/:eventId',component:UpdateEventComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }