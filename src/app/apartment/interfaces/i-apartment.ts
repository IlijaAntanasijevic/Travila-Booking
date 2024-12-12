import { ISorts } from "../apartment-dashboard/interfaces/i-filter";

export interface IApartment {
  id: number;
  name: string;
  maxGuests: number;
  pricePerNight: number;
  mainImage: string;
  city: string;
  country: string;
  apartmentType: string;
}


export interface IApartmentSearch {
  keyword?: string;
  cityId?: number;
  countryId?: number;
  apartmentTypeIds?: number[];
  perPage?: number;
  page?: number;
  sorts?: ISorts[]; 
  maxPrice?: number;
}