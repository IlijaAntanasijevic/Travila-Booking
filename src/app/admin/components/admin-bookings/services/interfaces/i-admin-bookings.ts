export interface IAdminBooking {
  id: number;
  apartmentId: number;
  apartmentName: string;
  apartmentImage: string;
  city: string;
  ownerId: number;
  ownerFullName: string;
  guestId: number;
  guestFullName: string;
  checkIn: string;
  checkOut: string;
  totalGuests: number;
  status: number;
  totalPrice: number;
}

export interface IAdminBookingFilters {
  users: { id: number; name: string; }[];
  cities: { id: number; name: string; }[];
  statuses: { id: number; name: string; }[];
}


