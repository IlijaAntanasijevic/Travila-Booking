export const apiPaths = {
  home: {
    search: "api/apartment?",
    featuredApartments: "api/apartment?"
  },
  apartment: {
    api: "api/apartment",
    rating: "api/rating",
    favorite: "api/apartment/favorite",
    image: "api/apartment/image",
    archive: "api/apartment/archive",
    activate: "api/apartment/activate",
    ai: "api/apartment/ai",
    aiChat: "api/apartment/chat"
  },
  lookup: {
    cities: "api/city",
    countries: "api/country",
    paymentType: "api/payment",
    features: "api/features",
    apartmentType: "api/ApartmentType"

  },
  auth: {
    login: "api/login",
    regiter: "api/register",
    confirm: "api/auth/confirm",
    resend: "api/auth/resend",
    forgotPassword: "api/auth/forgot-password",
    changePassword: "api/auth/change-password",
  },
  user: {
    api: "api/users",
    avatar: "api/users/avatar"
  },
  bookings: {
    api: "api/bookings",
    myGuests: "api/bookings/guests"
  },
  images: {
    api: "api/files"
  },
  chatMessages: {
    api: "api/chat",
    prepareChat: "api/prepare-chat"
  },
  admin: {
    dashboard: "api/admin/dashboard",
    apartments: "api/admin/apartments",
    apartmentFilters: "api/admin/apartments/filters",
    allUsers: "api/admin/users",
    userUseCases: "api/admin/users/use-cases"
  }
}