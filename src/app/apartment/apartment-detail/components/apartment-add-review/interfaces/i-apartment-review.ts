export interface IApartmentReview {
  comment: string;
  apartmentId: number;
  values: IApartmentRating[];
}


export interface IApartmentReviewRequest extends IApartmentReview {

}

export interface IUserRatings {
  avatar: string;
  avgRating: number;
  comment: string;
  date: Date;
  fullName: string
}


interface IApartmentRating {
  id: number;
  value: number;
}