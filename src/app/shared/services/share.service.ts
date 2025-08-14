import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(
    private toastr: ToastrService
  ) { }

  async copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        this.toastr.success('Link copied to clipboard!');
        return true;
      } 
      else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const result = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (result) {
          this.toastr.success('Link copied to clipboard!');
          return true;
        } else {
          this.toastr.error('Failed to copy link');
          return false;
        }
      }
    } 
    catch (error) {
      console.error('Error copying to clipboard:', error);
      this.toastr.error('Failed to copy link');
      return false;
    }
  }

  async shareViaWebAPI(title: string, text: string, url: string): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url
        });
        return true;
      } 
      catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          this.toastr.error('Failed to share');
        }
        return false;
      }
    }
    return false;
  }

  shareViaFacebook(url: string): void {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    this.openShareWindow(facebookUrl, 'Share on Facebook');
  }

  shareViaTwitter(url: string, text: string = ''): void {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    this.openShareWindow(twitterUrl, 'Share on Twitter');
  }

  shareViaLinkedIn(url: string, title: string = ''): void {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    this.openShareWindow(linkedInUrl, 'Share on LinkedIn');
  }

  shareViaWhatsApp(url: string, text: string = ''): void {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    this.openShareWindow(whatsappUrl, 'Share on WhatsApp');
  }

  shareViaEmail(url: string, subject: string = '', body: string = ''): void {
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + '\n\n' + url)}`;
    window.location.href = emailUrl;
  }

  private openShareWindow(url: string, title: string): void {
    const width = 800;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    
    window.open(
      url,
      title,
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  }

  getCurrentUrl(): string {
    return window.location.href;
  }

  getApartmentUrl(apartmentId: number): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/apartments/${apartmentId}`;
  }
}
