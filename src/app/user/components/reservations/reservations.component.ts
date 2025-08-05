import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BlBookingsRequestsService } from './services/requests/bl-bookings-requests.service';
import { Spinner } from '../../../core/functions/spinner';
import { IReservation } from './interfaces/i-reservation';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../interfaces/i-user';
import { ReservationInfoDialogComponent } from './components/reservation-info-dialog/reservation-info-dialog.component';

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.css',
    standalone: false
})
export class ReservationsComponent {

 


}
