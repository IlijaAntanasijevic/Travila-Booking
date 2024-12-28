import { IBase } from "../../../../core/interfaces/i-base";

interface ISearchHomeBase {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  childrens?: number;
  rooms?: number;
}

export interface ISearchHome extends ISearchHomeBase {
  city: IBase;
}

export interface ISearchHomeRequest extends ISearchHomeBase {
  cityId?: number;

}