export interface IAdminDashboardDto {
    statistics: StatisticsDto;
    newBookings: NewBookingsDto[];
    newApartments: NewApartmentsDto[];
  }
  
  export interface StatisticsDto {
    totalUsers: number;
    totalApartments: number;
    totalBookings: number;
    deletedApartments: number;
  }
  
  export interface NewBookingsDto {
    location: string;
    ownerName: string;
    checkIn: Date;   
    checkOut: Date;  
    status: number; 
    totalNights: number;
    totalGuests: number;
    totalPrice: number;
  }
  
  export interface NewApartmentsDto {
    apartmentName: string;
    ownerName: string;
    createdAt: Date;
    status: number; 
    location: string;
    totalRoomns: number; 
    price: number;
  }