import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlHomeRequestsService } from '../../services/requests/bl-home-requests.service';
import { IHomeTestimonials } from '../../services/interfaces/i-home-stats';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';

@Component({
  selector: 'app-home-testimonials',
  templateUrl: './home-testimonials.component.html',
  styleUrls: ['./home-testimonials.component.css'],
  standalone: false
})
export class HomeTestimonialsComponent implements OnInit, OnDestroy {

  constructor(
    private homeRequestsService: BlHomeRequestsService
  ) { }

  private subscription: Subscription = new Subscription();
  currentIndex = 0;
  itemsPerView = 3;
  testimonials: IHomeTestimonials[] = [];
  imageType = IMAGE_TYPE;

  ngOnInit(): void {
    this.getTestimonials();
  }

  getTestimonials(): void {
    this.subscription.add(
      this.homeRequestsService.getHomeTestimonials().subscribe({
        next: (data) => {
          console.log(data);
          this.testimonials = data;
        }
      })
    )
  }

  get visibleTestimonials(): IHomeTestimonials[] {
    return this.testimonials.slice(this.currentIndex, this.currentIndex + this.itemsPerView);
  }

  next(): void {
    if (this.currentIndex + this.itemsPerView < this.testimonials.length) {
      this.currentIndex += this.itemsPerView;
    } else {
      this.currentIndex = 0;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerView;
    } else {
      this.currentIndex = Math.max(0, this.testimonials.length - this.itemsPerView);
    }
  }

  getStarArray(avgRating: number): ('full' | 'half' | 'empty')[] {
    let stars: ('full' | 'half' | 'empty')[] = [];

    let fullStars = Math.floor(avgRating);
    let hasHalf = avgRating % 1 >= 0.25 && avgRating % 1 < 0.75;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push('full');
      else if (i === fullStars + 1 && hasHalf) stars.push('half');
      else stars.push('empty');
    }
    
    return stars;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
