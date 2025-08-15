export interface IApartmentReview {
  // accessibility: number;
  // entertainment: number;
  // price: number;
  // safety: number;
  // service: number;
  // support: number;
  comment: string;
  apartmentId: number;
  values: IApartmentRating[];
}


export interface IApartmentReviewRequest extends IApartmentReview {

}


interface IApartmentRating {
  id: number;
  value: number;
}