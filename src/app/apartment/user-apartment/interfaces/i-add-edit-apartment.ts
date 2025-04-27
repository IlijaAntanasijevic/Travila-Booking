import { IBase } from "../../../core/interfaces/i-base"
import { IApartmenImage } from "../../interfaces/i-apartment";

interface IAddEditApartmentBase {
  name: string;
  description: string;
  address: string;
  longitude: number;
  lattitude: number;
  price: number;
  apartmentTypeId: number;
  featureIds: number[];
  paymentMethodIds: number[];
  guests: IGuests;

}

export interface IAddEditApartmentForm extends IAddEditApartmentBase {
  mainImage: any;
  images: any[]
  city?: IBase;
  country?: IBase;

}

export interface IAddApartmentRequest extends IAddEditApartmentBase {
  cityId: number;
  countryId: Number;
  mainImage: string;
  images: string[]
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
  childrens: number;
  totalRooms: number;
}
export interface IApartmentUploadImage {
  file: File;
  imageType: number;
}