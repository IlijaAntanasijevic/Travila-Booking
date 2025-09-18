export interface IHomeStats {
    totalUsers: number;
    totalApartments: number;
    totalBookings: number;
    avgRating: number;
    totalReviews: number;
}


export interface IHomeTestimonials {
    id: number;
    apartmentId: number;
    apartmentName: string;
    userFullName: string;
    avatar: string;
    rating: number;
    ratingInfo: number;
    location: string;
    created: string;
}