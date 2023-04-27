import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Event } from 'src/Models/Event';
import { EventService } from 'src/Services/EventService.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/Models/User';
import { UserService } from 'src/Services/UserService.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public eventForm: FormGroup;
  public userList: User[] = []; // array of available users
  public selectedUsers: number[] = []; // array of selected user IDs
 
  constructor(
    private userService: UserService,
    private eventService: EventService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      eventTitle: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventStartTime: ['', Validators.required],
      eventType: ['', Validators.required],
      eventEndTime: ['', Validators.required],
      eventLocation: ['', Validators.required],
      users: ['']
    });
  }
 
  ngOnInit(): void {
    // Get the list of available users from the user service
    this.userService.getAllUsers().subscribe(users => {
      this.userList = users;
    });
  }
  

  // Returns true if the given user is already selected
  isSelected(user: User): boolean {
    return this.selectedUsers.indexOf(user.idUser) !== -1;
  }
 
  createEvent(): void {
    
    const eventData = this.eventForm.value as Event;
    const eventDate = this.eventForm.get('eventDate')?.value;
    const eventStartTime = this.eventForm.get('eventStartTime')?.value;
    eventData.eventStartTime = eventDate && eventStartTime ? new Date(`${eventDate}T${eventStartTime}`) : new Date();
    
    // Combine the date and time inputs to create a single Date object for the end time
    const eventEndTime = this.eventForm.get('eventEndTime')?.value;
    eventData.eventEndTime = eventDate && eventEndTime ? new Date(`${eventDate}T${eventEndTime}`) : new Date();
    
    eventData.users = this.userList.filter(user => this.selectedUsers.indexOf(user.idUser) !== -1);
    this.eventService.createEvent(eventData).subscribe(data => {
      console.log(data);
      this.router.navigate(['/event']);
    });
  }
   
}

