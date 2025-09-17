import { Directive, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { Subscription } from 'rxjs';
import { AllUseCases } from '../consts/use-cases';

@Directive({
  selector: '[appCan]',
  standalone: false
})
export class CanDirective  {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
  ) { }

  private useCaseIds: number | number[] = 0;
  @Input() set appCan(permission: number | number[]) {
    this.useCaseIds = permission;
    this.updateView();
  }

   private updateView() {
    this.viewContainer.clear();
    let hasPermission = false;
    
    if (Array.isArray(this.useCaseIds)) {
      hasPermission = this.useCaseIds.some(useCaseId => this.permissionService.has([useCaseId]));
    } 
    else {
      hasPermission = this.permissionService.has([this.useCaseIds]);
    }
    
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}


@Directive({
  selector: '[appMustCanBoth]',
  standalone: false
})
export class CanMustBothDirective  {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
  ) { }

  private useCaseIds: number[] = [];
  @Input() set appMustCanBoth(permission: number[]) {
    this.useCaseIds = permission;
    this.updateView();
  }

   private updateView() {
    this.viewContainer.clear();
    let hasPermission = false;
    console.log(this.useCaseIds);
    
    hasPermission = this.useCaseIds.every(useCaseId => this.permissionService.has([useCaseId]));
    
    if (hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
