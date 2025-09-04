import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AiApartmentService } from '../../api/ai-apartment.service';
import { IAiApartmentRequest, IAiApartmentResponse } from '../../interfaces/i-ai-apartment-request';
import { ISearchHomeRequest } from '../../../home/components/home-seach/interfaces/i-search-home';
import { ToastrService } from 'ngx-toastr';
import { CityService } from '../../api/lookup/city.service';
import { CountryService } from '../../api/lookup/country.service';
import { IBase } from '../../../core/interfaces/i-base';
import { BlAiRequestsService } from '../../requests/bl-ai-requests.service';

@Component({
  selector: 'app-ai-agent',
  templateUrl: './ai-agent.component.html',
  styleUrl: './ai-agent.component.css',
  standalone: false
})
export class AiAgentComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlAiRequestsService,
    private toastr: ToastrService,
    private cityService: CityService,
    private countryService: CountryService
  ) {}

  @Input() searchData: ISearchHomeRequest;

  public isExpanded = false;
  public hasNewMessage = false;
  public isLoading = false;
  public aiResponse: string = '';
  public chatMessages: Array<{type: 'user' | 'ai', message: string, timestamp: Date}> = [];
  public showIntroAnimation = false;
  
  public messageInput = new FormControl('', [Validators.required]);
  
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this.searchData) {
      this.getInitialAiRecommendation();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded && this.hasNewMessage) {
      this.hasNewMessage = false;
    }
  }

  getInitialAiRecommendation(): void {
    if (!this.searchData) return;

    this.isLoading = true;
    
    this.subscription.add(
      this.cityService.getAllByCountryId(this.searchData.cityId).subscribe({
        next: (data) => {
          let request: IAiApartmentRequest = {
            adults: this.searchData.adults || 1,
            childrens: this.searchData.childrens || 0,
            city: data.find((city: IBase) => city.id == this.searchData.cityId).name,
            country: 'Unknown', 
            checkIn: new Date(this.searchData.checkIn),
            checkOut: new Date(this.searchData.checkOut)
          };

          this.getInitialAiMessage(request);
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error('Failed to get city information');
        }
      })
    );
  }

  getInitialAiMessage(request: IAiApartmentRequest): void {
    this.subscription.add(
      this.requestsService.getAiRecommendation(request).subscribe({
        next: (response: IAiApartmentResponse) => {
          this.aiResponse = response.text;
          this.chatMessages.push({
            type: 'ai',
            message: response.text,
            timestamp: new Date()
          });
          this.hasNewMessage = true;
          this.showIntroAnimation = true;
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.toastr.error('Failed to get AI recommendations');
        }
      })
    );
  }

  sendMessage(): void {
    if (this.messageInput.invalid || !this.messageInput.value.trim()) return;

    const userMessage = this.messageInput.value.trim();
    this.chatMessages.push({
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    });

    this.messageInput.setValue('');
    this.isLoading = true;

    // For now, we'll just echo the message back as AI response
    // In a real implementation, you'd send this to the AI service
    setTimeout(() => {
      this.chatMessages.push({
        type: 'ai',
        message: `I understand you're asking: "${userMessage}". I'm here to help you find the perfect apartment for your stay!`,
        timestamp: new Date()
      });
      this.isLoading = false;
    }, 1000);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
