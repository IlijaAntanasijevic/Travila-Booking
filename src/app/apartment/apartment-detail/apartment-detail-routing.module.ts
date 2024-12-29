import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentViewComponent } from './components/apartment-view/apartment-view.component';

const routes: Routes = [
  {
    path: "",
    component: ApartmentViewComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentDetailRoutingModule { }
