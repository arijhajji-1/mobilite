import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventService } from '../../../Services/EventService.service';
import { Event } from '../../../Models/Event';
import { User } from 'src/Models/User';
import { UserService } from 'src/Services/UserService.service';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  public eventForm!: FormGroup;
  eventId!: number;
  event!: Event;
  public selectedUsers: number[] = []; // array of selected user IDs

  constructor(
    private userService: UserService,

    private formBuilder: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  userList!: User[];


  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.eventService.getEvent(this.eventId)
      .subscribe(event => {
        this.event = event;
        this.initForm();
      });
      this.userService.getAllUsers().subscribe(users => {
        this.userList = users;
      });
  }

  initForm(): void {
    this.eventForm = this.formBuilder.group({
      eventTitle: [this.event.eventTitle, Validators.required],
      eventDescription: [this.event.eventDescription, Validators.required],
      eventDate: [this.event.eventDate, Validators.required],
      eventStartTime: [this.event.eventStartTime, Validators.required],
      eventEndTime: [this.event.eventEndTime, Validators.required],
      eventType: [this.event.eventType, Validators.required],
      eventLinkHangout: [this.event.eventLinkHangout, Validators.required],
      eventLocation: [this.event.eventLocation, Validators.required],
      eventAttendees: [this.event.users]
    });
  }
  isSelected(user: User): boolean {
    return this.selectedUsers.indexOf(user.idUser) !== -1;
  }
  
  
  updateEvent(): void {
    const updatedEvent: Event = { ...this.eventForm.value, idEvent: this.eventId };
  
    const eventDate = this.eventForm.get('eventDate')?.value;
    const eventStartTime = this.eventForm.get('eventStartTime')?.value;
    updatedEvent.eventStartTime = eventDate && eventStartTime ? new Date(`${eventDate}T${eventStartTime}`) : new Date();
  
    const eventEndTime = this.eventForm.get('eventEndTime')?.value;
    updatedEvent.eventEndTime = eventDate && eventEndTime ? new Date(`${eventDate}T${eventEndTime}`) : new Date();
  
    updatedEvent.users = this.userList.filter(user => this.selectedUsers.indexOf(user.idUser) !== -1);
  
    this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(() => {
      this.router.navigate(['/event/event']);
    });
  }
  
}
