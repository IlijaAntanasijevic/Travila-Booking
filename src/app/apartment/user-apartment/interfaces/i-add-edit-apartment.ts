import { IBase } from "../../../core/interfaces/i-base"

interface IAddEditApartmentBase {
  name: string;
  description: string;
  address: string;
  longitude: number;
  lattitude: number;
  price: number;
  mainImage: FormData;
  apartmentTypeId: number;
  featureIds: number[];
  paymentMethodIds: number[];
  images: FormData[]
  guests: IGuests;

}

export interface IAddEditApartmentForm extends IAddEditApartmentBase {
  city?: IBase;
  country?: IBase;

}

export interface IAddApartmentRequest extends IAddEditApartmentForm {
  cityId: IBase;
  countryId: IBase;
}


export interface IApartmentDdlData {
  features: IBase[];
  paymentMethods: IBase[];
  countries: IBase[];
  cities: IBase[];
  apartmentTypes: IBase[]
}


interface IGuests {
  adults: number;
  children: number;
  totalRooms: number;
}