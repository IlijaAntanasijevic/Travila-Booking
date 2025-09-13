import { IUserOverviewLinks } from "../interfaces/i-user-overview-links";

export const USER_OVERVIEW_LINKS: IUserOverviewLinks[] = [
  {
    name: "Profile",
    link: "user/profile",
    icon: "manage_accounts",
  },
  {
    name: "Favorite",
    link: "user/favorite",
    icon: "favorite"
  },
  {
    name: "Messages",
    link: "user/messages",
    icon: "chat"
  },
  {
    name: "Reservations",
    link: "user/reservations",
    icon: "event"
  },
  {
    name: "Apartments",
    link: "apartments/user",
    icon: "apartment",
  },
    {
    name: "Admin Panel",
    link: "/admin",
    icon: "settings"
  },
]