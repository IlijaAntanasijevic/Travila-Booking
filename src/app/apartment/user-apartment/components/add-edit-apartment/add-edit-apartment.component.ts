import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlAddEditApartmentFormService } from '../../services/form/bl-add-edit-apartment-form.service';
import { BlAddEditApartmentRequestsService } from '../../services/requests/bl-add-edit-apartment-requests.service';
import { IApartmentDdlData } from '../../interfaces/i-add-edit-apartment';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IBase } from '../../../../core/interfaces/i-base';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-edit-apartment',
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})
export class AddEditApartmentComponent implements OnInit, OnDestroy {

  constructor(
    private formService: BlAddEditApartmentFormService,
    private requestsService: BlAddEditApartmentRequestsService
  ) { }

  private subscription: Subscription = new Subscription();
  form = this.formService.getForm();
  filteredCountries: Observable<IBase[]>;
  filteredCities: Observable<IBase[]>;
  files: File[] = [];

  ddlData: IApartmentDdlData = {
    features: [],
    apartmentTypes: [],
    countries: [],
    paymentMethods: [],
    cities: []
  }

  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ 'header': [1, 2, 3, 4, 5, 6,] }],
    // [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }, { 'header': 4 }, { 'header': 5 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  editorConfig = {
    toolbar: this.toolbarOptions
  }

  quillEditorStyle = {
    height: '300px',
    display: 'block'
  };

  ngOnInit(): void {
    this.getDllData();
    this.form.markAllAsTouched();
  }

  getDllData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllData().subscribe({
        next: (data) => {
          this.ddlData.countries = data?.countries;
          this.ddlData.features = data?.features;
          this.ddlData.apartmentTypes = data?.apartmentTypes;
          this.ddlData.paymentMethods = data?.paymentTypes;
          this.initCountries();
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  initCountries(): void {
    this.filteredCountries = this.form.controls['country'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.ddlData.countries.slice();
      }),
    );
  }

  private filter(name: string, isCountry: boolean = true): IBase[] {
    const filterValue = name.toLowerCase();
    if (isCountry) {
      return this.ddlData.countries.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    return this.ddlData.cities.filter(option => option.name.toLowerCase().includes(filterValue));

  }

  displayFn(value: IBase): string {
    return value && value.name ? value.name : '';
  }

  getCities(): void {
    Spinner.show();
    const cityControl = this.form.controls['cityId'];
    let countryId = this.formService.getFormData().country.id;
    this.subscription.add(
      this.requestsService.getCitiesByCountryId(countryId).subscribe({
        next: (data) => {
          this.ddlData.cities = data;
          cityControl.enable();
          cityControl.setValue("")
          this.filteredCities = cityControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.name;
              return name ? this.filter(name as string, false) : this.ddlData.cities.slice();
            }),
          );

          this.filteredCities.subscribe({
            next: (data) => {
              console.log(data);

            }
          })

          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  increaseGuests(type: string): void {
    const formControl = this.form.get(`guests.${type}`) as FormControl;
    let value = formControl.value;

    if (value == 20 && type == "adults")
      return;
    else if (value == 10 && type != "adults")
      return;

    value++;
    formControl.setValue(value);
  }

  decreaseGuests(type: string): void {
    const formControl = this.form.get(`guests.${type}`) as FormControl;
    let value = formControl.value;

    if (value == 1 && type != "childrens")
      return;
    if (type == 'childrens' && value == 0) {
      formControl.setValue(0);
      return;
    }
    value--;
    formControl.setValue(value);
  }

  totalGuests(): number {
    const adults = this.form.get('guests.adults')?.value || 0;
    const children = this.form.get('guests.childrens')?.value || 0;
    return adults + children;
  }

  onImageSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onImageRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  submit(): void {
    console.log(this.formService.getFormData());

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
