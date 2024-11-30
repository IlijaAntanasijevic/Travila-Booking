import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IApartment } from '../../../apartment/interfaces/i-apartment';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() paginationData: IPaginatedResponse<IApartment>;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number;
  currentPage: number = 1;
  perPage: number = 9;

  apartments: IApartment[] = [];


  ngOnChanges(): void {
    this.apartments = this.paginationData.data;
    this.totalPages = this.paginationData.pages;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }

  getRange(rate: number) {    
    return Array.from({length: rate}, (_, i) => i + 1);
  }
}
