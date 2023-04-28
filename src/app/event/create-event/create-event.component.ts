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
    const isSelected = this.selectedUsers.indexOf(user.idUser) !== -1;
    console.log(`isSelected(${user.email}): ${isSelected}`);
    return isSelected;
  }
  onUserSelectionChange(userId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedUsers.push(userId);
    } else {
      const index = this.selectedUsers.indexOf(userId);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }
  
  
  
  
  
  selectUser(userId: number): void {
    this.selectedUsers.push(userId);
    console.log('selectedUsers:', this.selectedUsers); // add this line
  }
  
  deselectUser(userId: number): void {
    const index = this.selectedUsers.indexOf(userId);
    if (index !== -1) {
      this.selectedUsers.splice(index, 1);
      console.log('selectedUsers:', this.selectedUsers); // add this line
    }
  }
  createEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }
    console.log('Selected users:', this.onUserSelectionChange);

    const eventData = this.eventForm.value as Event;
    console.log('eventData:', eventData); // add this line
    const eventDate = this.eventForm.get('eventDate')?.value;
    const eventStartTime = this.eventForm.get('eventStartTime')?.value;
    eventData.eventStartTime = eventDate && eventStartTime ? new Date(`${eventDate}T${eventStartTime}`) : new Date();
    
    // Combine the date and time inputs to create a single Date object for the end time
    const eventEndTime = this.eventForm.get('eventEndTime')?.value;
    eventData.eventEndTime = eventDate && eventEndTime ? new Date(`${eventDate}T${eventEndTime}`) : new Date();
    console.log('this.userList:', this.userList); // add this line
  console.log('this.selectedUsers:', this.selectedUsers); // add this line

  const selectedUsers = this.userList.filter(user => this.selectedUsers.indexOf(user.idUser) !== -1);
  console.log('selectedUsers:', selectedUsers); // add this line
  eventData.users = selectedUsers;

  // Use map to create an array of attendee emails
  const attendeeEmails = selectedUsers.map(user => user.email);
  console.log('attendeeEmails:', attendeeEmails); // add this line
  eventData.attendeeEmails = attendeeEmails;

    eventData.eventTitle = this.eventForm.get('eventTitle')?.value;
    eventData.eventDescription = this.eventForm.get('eventDescription')?.value;
    console.log("eventTitle: ", this.eventForm.get('eventTitle')?.value);
console.log("eventDescription: ", this.eventForm.get('eventDescription')?.value);
eventData.attendeeEmails = attendeeEmails;

    this.eventService.createEvent(eventData).subscribe(data => {
      console.log(eventData);
      this.router.navigate(['/event/event']);
    });
  } 
}
