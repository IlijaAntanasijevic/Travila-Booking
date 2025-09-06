import { Pipe, PipeTransform } from '@angular/core';
import { PermissionService } from '../services/permission.service';

@Pipe({
  name: 'permission',
  standalone: false
})
export class PermissionPipe implements PipeTransform {

  constructor(
    private permissionService: PermissionService
  ) { }

  transform(useCaseId: number): boolean {
    console.log('useCaseId in pipe:', useCaseId);
    console.log(this.permissionService.has([useCaseId]));
    
    return this.permissionService.has([useCaseId]);
    
  }

}
