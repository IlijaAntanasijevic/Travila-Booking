export interface IApartmentReview {
  comment: string;
  accessibility: number;
  entertainment: number;
  price: number;
  safety: number;
  service: number;
  support: number;
}


export interface IApartmentReviewRequest extends IApartmentReview {

}