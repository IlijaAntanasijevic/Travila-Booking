import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShareService } from '../../services/share.service';

export interface ShareDialogData {
  title: string;
  description: string;
  url: string;
  apartmentId?: number;
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
  standalone: false
})
export class ShareDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShareDialogData,
    private shareService: ShareService
  ) { }

  ngOnInit(): void {
    if (!this.data.url && this.data.apartmentId) {
      this.data.url = this.shareService.getApartmentUrl(this.data.apartmentId);
    }
  }

  copyLink(): void {
    this.shareService.copyToClipboard(this.data.url);
  }

  async shareViaWebAPI(): Promise<void> {
    const success = await this.shareService.shareViaWebAPI(
      this.data.title,
      this.data.description,
      this.data.url
    );
    if (success) {
      this.dialogRef.close();
    }
  }

  get navigator() {
    return navigator;
  }

  shareViaFacebook(): void {
    this.shareService.shareViaFacebook(this.data.url);
  }

  shareViaTwitter(): void {
    this.shareService.shareViaTwitter(this.data.url, this.data.title);
  }

  shareViaLinkedIn(): void {
    this.shareService.shareViaLinkedIn(this.data.url, this.data.title);
  }

  shareViaWhatsApp(): void {
    this.shareService.shareViaWhatsApp(this.data.url, this.data.title);
  }

  shareViaEmail(): void {
    this.shareService.shareViaEmail(
      this.data.url,
      `Check out this apartment: ${this.data.title}`,
      this.data.description
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
