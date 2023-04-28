import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from '../../../Models/Formation';
import { FormationService } from '../../../Services/FormationService.service';

@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.css']
})
export class UpdateFormationComponent implements OnInit {

  id!: number;
  formation!: Formation;

  constructor(
    private formationService: FormationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formation = new Formation();

    this.id = this.route.snapshot.params['id'];

    this.formationService.getFormation(this.id)
      .subscribe(data => {
        console.log(data);
        this.formation = data;
      }, error => console.log(error));
  }

  updateFormation(): void {
    this.formationService.updateFormation(this.id, this.formation)
      .subscribe(data => {
        console.log(data);
        this.formation = new Formation();
        this.goToList();
      }, error => console.log(error));
  }

  onSubmit(): void {
    this.updateFormation();
  }

  goToList(): void {
    this.router.navigate(['/formation/formation']);
  }

}
