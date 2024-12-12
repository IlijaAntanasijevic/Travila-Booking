import { SortDirection, SortProperty } from "../enums/sort-type";

export interface IFilter {
  maxPrice?: number;
  apartmentTypeIds?: number;
  sorts: ISorts[];
  cityId: number;
}

export interface ISorts {
  sortProperty: SortProperty;
  direction: SortDirection
}