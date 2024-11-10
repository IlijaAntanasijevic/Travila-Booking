import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UserOverviewDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule
  ]
})
export class UserOverviewModule { }
