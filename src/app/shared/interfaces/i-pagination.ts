export interface IPagination {
  page: number;
  perPage: number;
}

export interface IPaginationData {
  data: any[];
  pages: number;
  perPage: number;
  totalCount: number;
}