import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BlAddEditApartmentFormService } from '../../services/form/bl-add-edit-apartment-form.service';
import { BlAddEditApartmentRequestsService } from '../../services/requests/bl-add-edit-apartment-requests.service';
import { IApartmentDdlData } from '../../interfaces/i-add-edit-apartment';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IBase } from '../../../../core/interfaces/i-base';
import { FormControl } from '@angular/forms';
import { ILocationCoordinates, ILocationInfo } from '../../../../shared/components/map/i-map';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-apartment',
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})
export class AddEditApartmentComponent implements OnInit, OnDestroy {

  constructor(
    private formService: BlAddEditApartmentFormService,
    private requestsService: BlAddEditApartmentRequestsService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  private subscription: Subscription = new Subscription();
  form = this.formService.getForm();
  filteredCountries: Observable<IBase[]>;
  coordinates: [number, number] | null = null;
  filteredCities: Observable<IBase[]>;
  files: File[] = [];
  isEdit: boolean = false;

  mapSelectedCountry: string = "";
  mapSelectedCity: string = "";
  locationInfo: ILocationInfo;
  selectedCoordinates: ILocationCoordinates;


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

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEdit = true;
        this.fillForm(id);
      }
    });

    this.form.get('city')?.valueChanges.subscribe(() => {
      this.mapSelectedCity = this.form.get('city')?.value?.name || '';
      this.mapSelectedCountry = this.form.get('country')?.value?.name || '';
    });
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

  fillForm(id: number): void {
    Spinner.show();
    this.subscription.add(
      this.formService.fillForm(id).subscribe({
        next: (data) => {
          console.log(data);
          this.form.controls['city'].enable();
          this.form.controls['address'].enable();

          const long = this.form.get('longitude')?.value;
          const lat = this.form.get('lattitude')?.value;
          
          if (long && lat) {
            this.selectedCoordinates = { longitude: long, lattitude: lat };
          }
          Spinner.hide();
        },
        error: (err) => Spinner.hide()

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
    const cityControl = this.form.controls['city'];
    const addressControl = this.form.controls['address'];
    let countryId = this.formService.getFormData().country.id;
    this.subscription.add(
      this.requestsService.getCitiesByCountryId(countryId).subscribe({
        next: (data) => {
          this.ddlData.cities = data;
          cityControl.enable();
          cityControl.setValue("")
          addressControl.enable();
          addressControl.setValue("");
          this.filteredCities = cityControl.valueChanges.pipe(
            startWith(''),
            map(value => {
              const name = typeof value === 'string' ? value : value?.name;
              return name ? this.filter(name as string, false) : this.ddlData.cities.slice();
            }),
          );
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  setPinnedLongLat(coords: ILocationCoordinates | null): void {    
    if(coords == null && this.selectedCoordinates == null) {
      this.form.controls['longitude'].setValue(null);
      this.form.controls['lattitude'].setValue(null);
    }
    else {
      this.form.controls['longitude'].setValue(coords.longitude);
      this.form.controls['lattitude'].setValue(coords.lattitude);
      this.form.controls['address'].markAsUntouched();
    }
  }

  setLocationInfo(info: ILocationInfo): void {
    if (info.street) {
      this.form.controls['address'].setValue(info.street + " " + (info.houseNumber ?? ''));
    }
    else {
      this.form.controls['address'].setValue("");
      this.form.controls['address'].markAsUntouched();
    }
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

  onImageSelect(event: any): void {
    if (!event.addedFiles || event.addedFiles.length === 0) {
      return;
    }

    const formDataImages: FormData[] = [];

    event.addedFiles.forEach((file: File, index: number) => {
      const formData = new FormData();
      formData.append("file", file);

      if (index === 0) {
        this.form.controls['mainImage'].setValue(formData);
      } else {
        formDataImages.push(formData);
      }
    });

    this.form.controls['images'].setValue(formDataImages);
    this.files.push(...event.addedFiles);
  }

  onImageRemove(event: any): void {
    const index = this.files.indexOf(event);
    if (index !== -1) {
      this.files.splice(index, 1);
    }

    if (index === 0 && this.files.length > 0) {
      const newMainImage = new FormData();
      newMainImage.append("file", this.files[0]);
      this.form.controls['mainImage'].setValue(newMainImage);
    }
    else if (this.files.length === 0) {
      this.form.controls['mainImage'].setValue(null);
    }

    const updatedFormDataImages: FormData[] = this.files.slice(1).map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return formData;
    });

    this.form.controls['images'].setValue(updatedFormDataImages);
  }

  submit(): void {
    Spinner.show();
    this.subscription.add(
      this.formService.submitInsert().subscribe({
        next: (data) => {
          Spinner.hide();

        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.reset();
  }
}
