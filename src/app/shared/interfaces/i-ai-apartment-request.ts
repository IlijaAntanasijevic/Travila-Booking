export interface IAiApartmentRequest {
  adults: number;
  childrens: number;
  cityId: number;
  checkIn: Date;
  checkOut: Date;
}

export interface IAiApartmentResponse {
  text: string;
  conversationId: number;
}
