export interface IBase {
  id: number;
  name: string
}

export interface IDefaultPagination {
  perPage: number;
  page: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  perPage: number;
  totalCount: number;
  pages: number;
  currentPage: number;
}