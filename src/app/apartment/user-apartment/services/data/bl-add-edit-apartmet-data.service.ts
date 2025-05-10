import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmetDataService {

  constructor() { }

  // isSuccessAdded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isSuccessChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public pageChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);

}
