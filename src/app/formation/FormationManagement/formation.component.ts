import { Component, OnInit } from '@angular/core';
import { Formation } from '../../../Models/Formation';
import { FormationService } from '../../../Services/FormationService.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationManagement implements OnInit {

  listFormations!: Formation[];

  constructor(private formationService: FormationService) { }

  ngOnInit() {
    this.getFormations();
  }

  getFormations() {
    this.formationService.getAllFormations().subscribe(
      (formations: Formation[]) => {
        this.listFormations = formations;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteFormation(formationId: number) {
    if (confirm('Are you sure you want to delete this formation?')) {
      this.formationService.deleteFormation(formationId).subscribe(
        (response) => {
          console.log('Formation deleted:', response);
          this.getFormations();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
