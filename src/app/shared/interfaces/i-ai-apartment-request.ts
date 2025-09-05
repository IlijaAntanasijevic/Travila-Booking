export interface IAiApartmentRequest {
  adults: number;
  childrens: number;
  city: string;
  country: string;
  checkIn: Date;
  checkOut: Date;
}

export interface IAiApartmentResponse {
  text: string;
  conversationId: number;
}
