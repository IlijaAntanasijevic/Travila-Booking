import { IDefaultPagination } from "../../../../core/interfaces/i-base";

export interface IErrorLog {
  errorId: number;
  email: string;
  message: string;
  stackTrace: string;
  time: string; // ISO date string
}

export interface IErrorLogSearch extends IDefaultPagination {
  keyword?: string;
}

export interface IUseCaseLog {
  id: number;
  email: string;
  useCaseData: any;
  useCaseName: string;
}

export interface IUseCaseLogSearch extends IDefaultPagination {
  keyword?: string;
}
