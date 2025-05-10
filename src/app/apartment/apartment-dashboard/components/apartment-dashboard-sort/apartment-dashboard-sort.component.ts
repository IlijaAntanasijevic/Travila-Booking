import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { ApartmentViewMode } from '../../enums/view-mode-enum';
import { BlApartmentFilterFormService } from '../../services/forms/bl-apartment-filter-form.service';
import { SHOW_TOTAL, SortDirection, SortProperty } from '../../enums/sort-type';
import { FormArray, FormControl } from '@angular/forms';

@Component({
    selector: 'app-apartment-dashboard-sort',
    templateUrl: './apartment-dashboard-sort.component.html',
    styleUrl: './apartment-dashboard-sort.component.css',
    standalone: false
})
export class ApartmentDashboardSortComponent implements OnInit{

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private formService: BlApartmentFilterFormService
  ) { }

  public form = this.formService.getForm();

  public viewMode = ApartmentViewMode;
  public totalApartments: number;
  public currentViewMode: ApartmentViewMode = ApartmentViewMode.LIST;

  show: number[] = SHOW_TOTAL;
  sortBy: any = Object.entries(SortProperty);
  selectedShow = 20;

  ngOnInit(): void {
    this.dataService.viewMode.subscribe({
      next: (viewMode) => this.currentViewMode = viewMode
    });

    this.dataService.totalApartments.subscribe({
      next: (total) => this.totalApartments = total
    })    
  }

  changeView(view: ApartmentViewMode): void {
    this.currentViewMode = view;        
    this.dataService.viewMode.next(view);
  }

  changeSortDirection(): void {
    const formValue = this.form.value;
    const sortsArray = this.form.get('sorts') as FormArray;
    const currentDir = sortsArray.at(0).get('direction').value;
    const changedDir = currentDir == SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc;

    sortsArray.at(0).get('direction').setValue(changedDir);  
    this.formService.setSelectedApartmentTypes();
    
    this.dataService.filter.next(this.form.value) 
  }

  sortChanged(): void {
    const formValue = this.form.value;
    this.formService.setSelectedApartmentTypes();
    console.log(formValue);
    this.dataService.filter.next(formValue);
    
  }

  getSortPropertyControl(): FormControl {
    const sortsArray = this.form.get('sorts') as FormArray;
    return sortsArray.at(0).get('sortProperty') as FormControl;
  }
}
