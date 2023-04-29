import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Event } from 'src/Models/Event'; // import the Event type from the correct file
import { EventService } from 'src/Services/EventService.service';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventComponent implements OnInit {
  public listevents: Event[] = [];
  searchText: any;

   constructor(private eventService: EventService, private route: Router) { }
   
   ngOnInit(): void {
     this.getAllEvents(); // call the method to fetch the events
   }
   search() {
    if (this.searchText != "") {
      this.listevents = this.listevents.filter(event => {
        return event.users.some(user => {
          return user.email.toLocaleUpperCase().includes(this.searchText.toLocaleUpperCase());
        });
      });
    } else {
      this.ngOnInit();
    }
  }
  
  
   getAllEvents(): void {
     this.eventService.getAllEvents().subscribe(data => {
       console.log(data); // log the response from the API call
       this.listevents = data;
       console.log(this.listevents); // log the events to the console
   
       // loop through each event and log it to the console
       this.listevents.forEach(event => {
         console.log(event);
       });
     });
   }
   deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.getAllEvents();

    });
  }
  getFormattedStartTime(event: Event): string {
    const startTime = moment(event.eventStartTime.valueOf(), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate();
    const formattedTime = moment(startTime).format('hh:mm A');
  
    return formattedTime;
  }
  
  getFormattedEndTime(event: Event): string {
    const endTime = moment(event.eventEndTime.valueOf(), "YYYY-MM-DDTHH:mm:ss.SSSZ").toDate();
    const formattedTime = moment(endTime).format('hh:mm A');
  
    return formattedTime;
  }
  
  
  generateExcel(): void {
    this.eventService.generateExcel().subscribe((data: Blob) => {
      FileSaver.saveAs(data, `event.xlsx`);
    });
  }
  
  
  
 }
