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

  private useCaseId: number = 0;
  @Input() set appCan(permission: number) {
    this.useCaseId = permission;
    this.updateView();
  }

   private updateView() {
    this.viewContainer.clear();
    if (this.permissionService.has([this.useCaseId])) {
      console.log('Permission granted for useCaseId:', this.useCaseId);
      
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      console.log('Permission denied for useCaseId:', this.useCaseId);
      
    }
  }

}
