import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BlHomeSearchFormService } from './services/form/bl-home-search-form.service';
import { BlHomeSearchRequestsService } from './services/requests/bl-home-search-requests.service';
import { IBase } from '../../../core/interfaces/i-base';
import { ISearchHome, ISearchHomeRequest } from './interfaces/i-search-home';
import { Spinner } from '../../../core/functions/spinner';
import { locationValidator } from './validators/location-validator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-seach',
    templateUrl: './home-seach.component.html',
    styleUrl: './home-seach.component.css',
    providers: [provideNativeDateAdapter()],
    standalone: false
})
export class HomeSeachComponent implements OnInit, OnDestroy {

  constructor(
    public formService: BlHomeSearchFormService,
    private homeSearchReqService: BlHomeSearchRequestsService,
    private router: Router
  ) { }

  myControl = new FormControl<string | IBase>('');
  filteredOptions: Observable<IBase[]>;
  cities: IBase[] = null;

  @Input() filterData: ISearchHomeRequest = null;

  public form = this.formService.getForm();


  public totalNights: number = null;
  public minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  public maxDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  public adultGuests: number = 1;

  private subscription: Subscription = new Subscription();

  ngOnInit() {    
    if(this.filterData){
      this.formService.fillForm(this.filterData);
      this.calculateTotalNights();
      
      
    }
   this.getAllCities();
  }


  getAllCities(): void {
    Spinner.show();
    this.subscription.add(
      this.homeSearchReqService.getAllCities().subscribe({
        next: (data) => {
          this.cities = data;
          this.form.get("city").setValidators(locationValidator(this.cities));

          if(this.filterData){
            const selectedCity = this.cities.find((city) => city.id === Number(this.filterData.cityId)) || null;            
            this.form.get('city').setValue(selectedCity);
          }
          this.initializeFilteredOptions();        
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  private initializeFilteredOptions(): void {
    this.filteredOptions = this.form.controls['city'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;        
        return name ? this._filter(name as string) : this.cities.slice();
      }),
    );
  }

  calculateTotalNights(): void {
    const checkIn = this.form.value.checkIn
    const checkOut = this.form.value.checkOut

    if (checkIn !== null && checkOut !== null) {
      const dateDifference = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      this.totalNights = dateDifference / (1000 * 60 * 60 * 24);
    }  
    else {
      this.totalNights = 0;
    }
  }

  increaseGuests(type: string): void {
    let formControl = this.form.get(type);
    let value = formControl.value;

    if(value == 20 && type != "rooms") 
      return;
    else if (value == 10 && type == "rooms") 
      return;

    value++;
    formControl.setValue(value);   
  }

  decreaseGuests(type: string): void {
    let formControl = this.form.get(type);
    let value = formControl.value;

    if(value == 1) 
      return;
    value--;
    formControl.setValue(value);   
  }

  search(): void {
    const formData: ISearchHome = this.formService.getFormData();

    // let dataToSend: ISearchHomeRequest = {
    //   checkIn: formData.checkIn,
    //   checkOut: formData.checkOut,
    //   adults: formData.adults,
    //   childrens: formData.childrens,
    //   rooms: formData.rooms,
    //   cityId: formData.city.id 
    // };

    let queryParams = {
  checkIn: formData.checkIn,
  checkOut: formData.checkOut,
  adults: formData.adults,
  childrens: formData.childrens,
  rooms: formData.rooms,
  cityId: formData.city.id
};

    if (this.router.url.startsWith('/apartments')) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/apartments'], { queryParams });
    });
  } 
  else {
    this.router.navigate(['/apartments'], { queryParams });
  }

    // this.router.navigate(['/apartments'], { queryParams: { 
    //   checkIn: formData.checkIn,
    //   checkOut: formData.checkOut,
    //   adults: formData.adults,
    //   childrens: formData.childrens,
    //   rooms: formData.rooms,
    //   cityId: formData.city.id
    // } });

    // this.homeSearchReqService.search(dataToSend).subscribe({
    //   next: (data) => {

    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }


  displayFn(city: IBase): string {
    return city && city.name ? city.name : '';
  }

  private _filter(name: string): IBase[] {
    const filterValue = name.toLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void {
    this.formService.reset();
    this.subscription.unsubscribe()
  }
  
}
