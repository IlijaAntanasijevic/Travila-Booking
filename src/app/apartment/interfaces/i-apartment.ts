import { ISearchHomeRequest } from "../../home/components/home-seach/interfaces/i-search-home";
import { IUser } from "../../user/interfaces/i-user";
import { ISorts } from "../apartment-dashboard/interfaces/i-filter";

export interface IApartment {
  id: number;
  name: string;
  maxGuests: number;
  pricePerNight: number;
  mainImage: IApartmenImage;
  city: string;
  country: string;
  apartmentType: string;
  isAvailable: boolean;
}


export interface IApartmentSearch extends ISearchHomeRequest {
  keyword?: string;
  countryId?: number;
  apartmentTypeIds?: number[];
  perPage?: number;
  page?: number;
  sorts?: ISorts[];
  maxPrice?: number;
  isAvailable?: boolean;
  isMyApartment?: boolean;
}

export interface IApartmentDetail extends IApartment {
  description: string;
  owner: IUser;
  paymentMethods: string[];
  features: string[];
  images: IApartmenImage[];
  longitude?: number;
  lattitude?: number;
  userCanBook: boolean;
}

export interface IApartmentImages {
  id: number;
  path: string;
  imageType: number;

}

export interface IApartmenImage {
  fileName: string;
  originalFileName: string;
  imageType: number;
}

