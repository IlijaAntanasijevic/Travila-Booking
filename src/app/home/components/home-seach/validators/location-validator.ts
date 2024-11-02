import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IBase } from '../../../../core/interfaces/i-base';

export function locationValidator(options: IBase[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = options.some(option => option.name === control.value.name);    
    
    return isValid ? null : { invalidLocation: true };
  };
}