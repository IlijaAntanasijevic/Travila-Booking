import { FormGroup } from "@angular/forms";

export interface IFormService<T> {
  form: FormGroup;
  init(): FormGroup;
  getForm(): FormGroup;
  getFormData(): T;
  reset(): void;
}