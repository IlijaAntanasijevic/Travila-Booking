export interface ISettings {
}

export interface IPaymentMethod {
    id?: number;
    name: string;
    isActive: boolean;
    processingFee: number;
    icon: string;
  }
  
  export interface ICity {
    id?: number;
    name: string;
    country?: string;
    countryId: number;
    isActive: boolean;
    currency?: string;
    totalApartments?: number;
    avgPrice?: number;
  }
  
  export interface IApartmentType {
    id: number;
    name: string;
    icon: string;
    isActive: boolean;
  }
  
  export interface IApartmentFeature {
    id: number;
    name: string;
    icon: string;
    isActive: boolean;
  }
  