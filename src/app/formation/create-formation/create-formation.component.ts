import { Component, OnInit } from '@angular/core';
import { Formation } from '../../../Models/Formation';
import { FormationService } from '../../../Services/FormationService.service';

@Component({
  selector: 'app-formations',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.css']
})
export class CreateFormationComponent implements OnInit {

  formations!: Formation[];
  newFormation: Formation = new Formation();
  formationForm: any;

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
  }

  createFormation() {
    // Check if the start time is a valid time string
    const startTimeRegex = /^\d{2}:\d{2}$/;
    if (!startTimeRegex.test(this.newFormation.formationStartTime)) {
      console.error('Invalid start time:', this.newFormation.formationStartTime);
      return;
    }
  
    // Check if the end time is a valid time string
    const endTimeRegex = /^\d{2}:\d{2}$/;
    if (!endTimeRegex.test(this.newFormation.formationEndTime)) {
      console.error('Invalid end time:', this.newFormation.formationEndTime);
      return;
    }
  
    // Convert the string start and end times to Date objects
    const startTime = `${this.newFormation.formationStartTime}:00`;
    const endTime = `${this.newFormation.formationEndTime}:00`;
  
    // Set the formatted start and end times in the newFormation object
    this.newFormation.formationStartTime = startTime;
    this.newFormation.formationEndTime = endTime;
  
    // Send the new formation to the backend
    this.formationService.createFormation(this.newFormation)
      .subscribe(
        );
  }
  
  
}
