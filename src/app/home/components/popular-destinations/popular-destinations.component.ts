import { Component } from '@angular/core';

@Component({
  selector: 'app-popular-destinations',
  templateUrl: './popular-destinations.component.html',
  styleUrl: './popular-destinations.component.css'
})
export class PopularDestinationsComponent {

  public destinations: any[] = [1,2,3,4,5,6,7,8];
}
