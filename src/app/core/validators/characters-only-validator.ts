import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function charactersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value.trim();
    const isValid = /^[A-Za-z]+( [A-Za-z]+)*$/.test(value);
    
    return isValid ? null : { charactersOnly: true };
  };
}