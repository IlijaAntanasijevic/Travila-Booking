import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BlAddEditApartmentFormService } from '../../services/form/bl-add-edit-apartment-form.service';
import { BlAddEditApartmentRequestsService } from '../../services/requests/bl-add-edit-apartment-requests.service';
import { IApartmentDdlData, IApartmentUploadImage } from '../../interfaces/i-add-edit-apartment';
import { forkJoin, map, Observable, of, startWith, Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IBase } from '../../../../core/interfaces/i-base';
import { FormControl } from '@angular/forms';
import { ILocationCoordinates, ILocationInfo } from '../../../../shared/components/map/i-map';
import { Router, ActivatedRoute } from '@angular/router';
import { IApartmenImage } from '../../../interfaces/i-apartment';
import { BlAddEditApartmetDataService } from '../../services/data/bl-add-edit-apartmet-data.service';
import { ImageType } from '../../../../shared/helpers/image-url.pipe';
import { ImageUtils } from '../../../../core/helpers/utility';

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
    private dataService: BlAddEditApartmetDataService
  ) { }

  private subscription: Subscription = new Subscription();
  form = this.formService.getForm();
  filteredCountries: Observable<IBase[]>;
  coordinates: [number, number] | null = null;
  filteredCities: Observable<IBase[]>;
  files: File[] = [];
  isEdit: boolean = false;
  id: number = null;

  mapSelectedCountry: string = "";
  mapSelectedCity: string = "";
  locationInfo: ILocationInfo;
  selectedCoordinates: ILocationCoordinates;
  existingImages: IApartmenImage[] = [];

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
      let id = params['id'];
      if (id) {
        this.isEdit = true;
        this.fillForm(id);
        this.id = id;
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

          var images: IApartmenImage[] = []
          images.push(data.mainImage);
          images.push(...data.images);

          this.getImages(images);
          
          Spinner.hide();
        },
        error: (err) => Spinner.hide()
      })

    )
  }

  getImages(images: IApartmenImage[]): void { 
    let filesResponse: File[] = [];
    
    images.forEach((image) => {     
      this.requestsService.getApartmentImage(image.fileName).subscribe((response) => {
        const file = new File([response], image.fileName);
        filesResponse.push(file);
      });
    });

    let mainImageFileName = images.find(x => x.imageType == ImageType.ApartmentMain)?.fileName;

    this.files = filesResponse.sort((a: File, b: File) => {
      if(a.name == mainImageFileName) return -1;
      if(b.name == mainImageFileName) return 1;
      return 0;
    })

    this.existingImages = images;
  }

  // async getImages(images: string[]): Promise<void> {
  //   console.log(images);
    
  //   for (const imageUrl of images) {
  //     const file = this.urlToFile(imageUrl, this.getFileNameFromUrl(imageUrl));
  //     this.files.push(await file);
  //   }
  // }

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
          cityControl.setValue("");
          this.selectedCoordinates = null;
          addressControl.enable();
          addressControl.setValue("");
          addressControl.markAsTouched();
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
      this.form.controls['longitude'].setValue(coords?.longitude);
      this.form.controls['lattitude'].setValue(coords?.lattitude);
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
    const mainImageFormControl = this.form.get('mainImage');
    const imagesFormControl = this.form.get('images');

    if (!event.addedFiles || event.addedFiles.length === 0) {
      mainImageFormControl.setValue("");
      imagesFormControl.setValue("");
      return;
    }
    
    this.files.push(...event.addedFiles);
    
    var filesToAdd: IApartmentUploadImage[] = [];
    this.files.forEach((file: File, index: number) => {
      const isExisting = this.existingImages.some(image => image.originalFileName === file.name || image.fileName === file.name);
      if(!isExisting) {
        filesToAdd.push({
          file: file,
          imageType: index == 0 ? ImageType.ApartmentMain : ImageType.Apartment
        });
      }
    })

    console.log(filesToAdd);
    console.log(imagesFormControl.value);
    console.log(this.existingImages);
    

    if(filesToAdd.length != 0){      
      Spinner.show();
      this.subscription.add(
        this.requestsService.uploadImages(filesToAdd).subscribe({
          next: (data) => {
            let images: IApartmenImage[] = data;
            let otherImageNames: string[] = [];
            images.forEach((image) => {
              if(image.imageType == ImageType.ApartmentMain){
                mainImageFormControl.setValue(image.fileName);
              }
              else if (image.imageType == ImageType.Apartment) {
                otherImageNames.push(image.fileName);
              }
            })

            this.existingImages.push(...images.map((image) => (
            { 
              fileName: image.fileName, 
              originalFileName: image.originalFileName, 
              imageType: image.imageType 
            } as IApartmenImage)));

            let currentOtherImages: string[] = imagesFormControl.value || [];
            const allOtherImages = [...currentOtherImages, ...otherImageNames];
            imagesFormControl.setValue(allOtherImages); 
            Spinner.hide();
          },
          error: (err) => {
            console.error(err);
            Spinner.hide();
          }
        })
      )
    }  
  }

  onImageRemove(event: any): void {
    const index = this.files.indexOf(event);
    if (index !== -1) {
      this.files.splice(index, 1);
    }

    let removedImage: IApartmenImage = null;

    if(this.isEdit){
      removedImage = this.existingImages.find(x => x.fileName == event.name);
      this.existingImages = this.existingImages.filter(x => x.fileName !== removedImage.fileName);

      if(removedImage.fileName == this.form.controls['mainImage'].value.fileName) {
        let newMainImage = this.existingImages[0]?.fileName || null;
        this.form.controls['mainImage'].setValue(newMainImage);
      }

      const otherImages = this.existingImages?.filter(image => image.fileName !== this.form.controls['mainImage'].value);
      this.form.controls['images'].setValue(otherImages.map(name => name.fileName));

      return;
    }

    //ON ADD IMAGES
    removedImage = this.existingImages.find(x => x.originalFileName === event.name);
    this.existingImages = this.existingImages.filter(x => x.originalFileName !== removedImage.originalFileName);
       
    
    if(removedImage.fileName == this.form.controls['mainImage'].value) {
      let newMainImage = this.existingImages[0]?.fileName || null;
      this.form.controls['mainImage'].setValue(newMainImage);
    }

    const otherImages = this.existingImages?.filter(name => name.fileName !== this.form.controls['mainImage'].value);
    this.form.controls['images'].setValue(otherImages.map(name => name.fileName));

  }

  // async urlToFile(url: string, filename: string): Promise<File> {
  //   const response = await fetch(url);
  //   const blob = await response.blob();
  //   return new File([blob], filename, { type: blob.type });
  // }

  // getFileNameFromUrl(url: string): string {
  //   return url.substring(url.lastIndexOf('/') + 1);
  // }

  submit(): void {
    Spinner.show();
    console.log(this.formService.getFormData());
    
    if(this.isEdit){
      this.subscription.add(
        this.formService.submitUpdate(this.id).subscribe({
          next: (data) => {
            Spinner.hide();
            this.dataService.isSuccessChanged.next(this.id);
            this.router.navigate(['apartments/user']);
          },
          error: (err) => Spinner.hide()
        })
      )
      
    }
    else {
      this.subscription.add(
        this.formService.submitInsert().subscribe({
          next: (data) => {
            Spinner.hide();
            this.dataService.isSuccessChanged.next(-1);
            this.router.navigate(['apartments/user']);
  
          },
          error: (err) => {
            Spinner.hide();
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.dataService.isSuccessChanged.closed;
    this.formService.reset();
  }
}
