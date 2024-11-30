import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-apartment-dashboard-filter',
  templateUrl: './apartment-dashboard-filter.component.html',
  styleUrl: './apartment-dashboard-filter.component.css'
})
export class ApartmentDashboardFilterComponent {
  public readonly filterPriceOpenState = signal(true);
  public readonly panelOpenState = signal(false);

  value = 50;

}
