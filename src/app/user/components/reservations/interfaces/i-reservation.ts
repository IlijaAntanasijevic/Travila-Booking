import { IUser } from "../../../interfaces/i-user";

export interface IReservation {
  data: IReservationInfo[];
  perPage: number;
  totalCount: number;
  pages: number;
  currentPage: number;
}

export interface IReservationInfo {
  bookingId: number;
  apartmentId: number;
  apartmentName: string;
  apartmentImage: string;
  totalPrice: number;
  user?: IUser;
  owner?: IUser;
  paymentMethod: null | string;
  checkIn: Date;
  checkOut: Date;
  totalGuests: number;
}