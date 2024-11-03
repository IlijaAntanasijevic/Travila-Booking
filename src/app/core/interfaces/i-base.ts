export interface IBase {
  id: number;
  name: string
}

export interface IPaginatedResponse<T> {
  data: T[];
  perPage: number;
  totalCount: number;
  pages: number;
  currentPage: number;
}