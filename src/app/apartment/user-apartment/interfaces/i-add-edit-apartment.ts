import { IBase } from "../../../core/interfaces/i-base"

export interface IAddEditApartmentForm {
  name: string,
  description: string,
  address: string,
  cityCountryId: number,
  cityId?: number,
  country?: IBase,
  guests: IGuests,
  pricePerNight: number,
  mainImage: string,
  apartmentTypeId: number,
  featuresIds: number[],
  paymentMethodIds: number[],
  images: string[]
}

export interface IApartmentDdlData {
  features: IBase[],
  paymentMethods: IBase[],
  countries: IBase[],
  cities: IBase[],
  apartmentTypes: IBase[]
}

export interface IAddApartmentRequest extends IAddEditApartmentForm {

}


interface IGuests {
  adults: number;
  children: number;
  totalRooms: number;
}