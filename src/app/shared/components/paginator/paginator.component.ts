import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IApartment } from '../../../apartment/interfaces/i-apartment';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.css',
    standalone: false
})

export class PaginatorComponent {

  @Input() data: IPaginatedResponse<any>;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number;
  currentPage: number = 1;
  ellipsisToShow: number = 4;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].currentValue){
      this.totalPages = this.data.pages;
      this.currentPage = this.data.currentPage;
    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }

  getDisplayedPages(): any {
    if(this.totalPages <= 5)
      return this.getRange(this.totalPages);

    const pages: (number | string)[] = [];

    pages.push(1);
    if (this.currentPage > 3) {
      pages.push('...'); 
    }

    if (this.currentPage > 2 && this.currentPage < this.totalPages - 1) {
      pages.push(this.currentPage);
    }

    pages.push(this.totalPages);

    return pages;
  }

  getRange(rate: number) {    
    return Array.from({length: rate}, (_, i) => i + 1);
  }
}
