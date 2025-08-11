import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlMessagesDataService {

  prepareChat: BehaviorSubject<number> = new BehaviorSubject<number>(0);  
}
