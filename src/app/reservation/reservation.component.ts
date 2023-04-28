import { Component, OnInit } from '@angular/core';
import { ReservationFormation } from '../../Models/ReservationFormation';
import { ReservationFormationService } from '../../Services/ReservationService.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservations!: ReservationFormation[];

  constructor(private reservationService: ReservationFormationService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAllReservationFormation().subscribe(
      (reservations: ReservationFormation[]) => {
        this.reservations = reservations;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateReservation(reservationId: number, status: string) {
    switch (status) {
        case 'APPROVED':
            this.reservationService.approveReservationFormation(reservationId).subscribe(
                response => {
                    console.log(response);
                    this.getReservations();
                },
                error => {
                    console.log(error);
                }
            );
            break;
        case 'REJECTED':
            this.reservationService.rejectReservationFormation(reservationId).subscribe(
                response => {
                    console.log(response);
                    this.getReservations();
                },
                error => {
                    console.log(error);
                }
            );
            break;
        case 'CANCELED':
            this.reservationService.cancelReservationFormation(reservationId).subscribe(
                response => {
                    console.log(response);
                    this.getReservations();
                },
                error => {
                    console.log(error);
                }
            );
            break;
        default:
            console.log('Invalid status');
            break;
    }
}


}
