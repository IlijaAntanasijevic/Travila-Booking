import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentMethodDialogComponent } from './dialogs/add-payment-method-dialog/add-payment-method-dialog.component';
import { AddCityDialogComponent } from './dialogs/add-city-dialog/add-city-dialog.component';
import { AddApartmentTypeDialogComponent } from './dialogs/add-apartment-type-dialog/add-apartment-type-dialog.component';
import { AddApartmentFeatureDialogComponent } from './dialogs/add-apartment-feature-dialog/add-apartment-feature-dialog.component';
import { IApartmentFeature, IApartmentType, ICity, IPaymentMethod, ITestimonialItem } from './interfaces/i-settings';
import { BlAdminSettingsRequestsService } from './services/requests/bl-admin-settings-requests.service';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';
import { AdminUseCases } from '../../../core/consts/use-cases';
import { PermissionService } from '../../../core/services/permission.service';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-settings',
  standalone: false,
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit, OnDestroy {

  constructor(
    private dialog: MatDialog,
    private requestsService: BlAdminSettingsRequestsService,
    private permissionService: PermissionService,
    private alertService: ToastrService
  ) { }


  private subscription: Subscription = new Subscription();
  isInitialized: boolean = false;
  activeTab: string = 'payment-methods';

  paymentMethods: IPaymentMethod[] = [];
  cities: ICity[] = [];
  apartmentFeatures: IApartmentFeature[] = [];
  apartmentTypes: IApartmentType[] = [];
  testimonials: ITestimonialItem[] = [];
  adminUseCases = AdminUseCases;
  imageType = IMAGE_TYPE;
  canViewTestimonials: boolean = false;

  ngOnInit(): void {
    this.canViewTestimonials = this.permissionService.has([this.adminUseCases.GetTestimonials]);
    this.getAllData();
    this.isInitialized = true;
  }

  getAllData(): void {
    !this.isInitialized ? Spinner.show() : null;
    this.subscription.add(
      this.requestsService.getAllData(this.canViewTestimonials).subscribe({
        next: (data) => {

          this.paymentMethods = data.paymentTypes;
          this.cities = data.cities;
          this.apartmentTypes = data.apartmentTypes;
          this.apartmentFeatures = data.features;
          this.testimonials = this.canViewTestimonials ? data.testimonials : [];
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  togglePaymentMethod(paymentMethod: IPaymentMethod): void {
    paymentMethod.isActive = !paymentMethod.isActive;
    this.subscription.add(
      this.requestsService.updatePaymentMethod(paymentMethod).subscribe({
        next: (data) => {
          this.getAllData();
        },
        error: (err) => {
          console.log(err);
        }

      })
    )
  }

  toggleCity(city: ICity): void {
    city.isActive = !city.isActive;
    this.subscription.add(
      this.requestsService.updateCity(city).subscribe({
        next: (data) => {
          this.getAllData();
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  toggleApartmentType(apartmentType: IApartmentType): void {
    apartmentType.isActive = !apartmentType.isActive;
    this.subscription.add(
      this.requestsService.updateApartmentType(apartmentType).subscribe({
        next: (data) => {
          this.getAllData();
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  toggleApartmentFeature(feature: IApartmentFeature): void {
    feature.isActive = !feature.isActive;
    this.subscription.add(
      this.requestsService.updateFeature(feature).subscribe({
        next: (data) => {
          this.getAllData();
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  toggleTestimonial(testimonial: ITestimonialItem): void {
    let currentlyEnabled = this.testimonials.filter(t => t.isVisibleOnHome).length;
    let willBeEnabled = testimonial.isVisibleOnHome ? currentlyEnabled - 1 : currentlyEnabled + 1;
    
    if (!testimonial.isVisibleOnHome && willBeEnabled > 12) {
      this.alertService.warning("Maximum 12 testimonials can be enabled");
      return;
    }
    
    if (testimonial.isVisibleOnHome && willBeEnabled < 3) {
      this.alertService.warning("Minimum 3 testimonials must be enabled");
      return;
    }

    testimonial.isVisibleOnHome = !testimonial.isVisibleOnHome;
    this.subscription.add(
      this.requestsService.updateTestimonial(testimonial).subscribe({
        next: (data) => {
          this.getAllData();
        },
        error: (err) => {
          this.alertService.error("Failed to update testimonial");
          testimonial.isVisibleOnHome = !testimonial.isVisibleOnHome;
        }
      })
    )
  }

  enabledTestimonialsCount(): number {
    return this.testimonials.filter(t => t.isVisibleOnHome).length;
  }

  canToggleTestimonial(testimonial: ITestimonialItem): boolean {
    let currentlyEnabled = this.testimonials.filter(t => t.isVisibleOnHome).length;
    
    if (testimonial.isVisibleOnHome && currentlyEnabled <= 3) {
      return false;
    }
    
    if (!testimonial.isVisibleOnHome && currentlyEnabled >= 12) {
      return false;
    }
    
    return true;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  openPaymentMethodDialog(paymentMethod: IPaymentMethod = null): void {
    if(!this.permissionService.has([this.adminUseCases.UpdatePaymentMethod])) return;
    let dialogRef = this.dialog.open(AddPaymentMethodDialogComponent, {
      width: '600px',
      data: { paymentMethod: paymentMethod || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllData();
      }
    });
  }

  openCityDialog(city: ICity = null): void {
    if(!this.permissionService.has([this.adminUseCases.UpdateCity])) return;
    let dialogRef = this.dialog.open(AddCityDialogComponent, {
      width: '600px',
      data: { city: city || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllData();
      }
    });
  }


  openApartmentTypeDialog(apartmentType: IApartmentType = null): void {
    if(!this.permissionService.has([this.adminUseCases.UpdateApartmentType])) return;
    let dialogRef = this.dialog.open(AddApartmentTypeDialogComponent, {
      width: '600px',
      data: { apartmentType: apartmentType || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllData();
      }
    });
  }

  openApartmentFeatureDialog(apartmentFeature: IApartmentFeature = null): void {
    if(!this.permissionService.has([this.adminUseCases.UpdateApartmentFeature])) return;
    const dialogRef = this.dialog.open(AddApartmentFeatureDialogComponent, {
      width: '600px',
      data: { apartmentFeature: apartmentFeature || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllData();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
