import { IBase } from "../../../../../core/interfaces/i-base";

export interface IAdminApartments {
    id: number;
    name: string;
    city: string;
    ownerFullName: string;
    image: string;
    price: number;
    totalBookings: number;
    status: number;
}

export interface IAdminApartmentFiltersData {
    cities: IBase[];
    users: IBase[];
    statuses: IBase[];
    totalBookings: IBase[];
}

export interface IAdminFiltersRequest {
    cityId?: number;
    userId?: number;
    status?: number;
    totalBookings?: number;
}


export enum ApartmentStatus {
    Active = 1,
    Deleted = 2,
    Archived = 3,
    Pending = 4
}