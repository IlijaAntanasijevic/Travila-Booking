import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface User {
  name: string;
}
@Component({
  selector: 'app-home-seach',
  templateUrl: './home-seach.component.html',
  styleUrl: './home-seach.component.css',
  providers: [provideNativeDateAdapter()],
})
export class HomeSeachComponent implements OnInit {

  myControl = new FormControl<string|User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;
  totalNights: number | null = null;
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  calculateTotalNights() {
    // const startDate = this.form.value.start
    // const endDate = this.form.value.end

    // if (startDate !== null && endDate !== null) {
    //   const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    //   this.totalNights = dateDifference / (1000 * 60 * 60 * 24);
    // }  
    this.totalNights = 5;
  }


  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  
}
