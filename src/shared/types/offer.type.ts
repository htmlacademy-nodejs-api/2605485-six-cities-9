import { City } from "./city.type.js";
import { HousingType } from "./housingType.type.js";
import { Facilities } from "./facilities.type.js";
import { User } from "./user.type.js";

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  image: string;
  housingImages: string;
  premium: boolean;
  favorites: boolean;
  rating: number;
  housingType: HousingType;
  rooms: number;
  guests: number;
  price: number;
  facilities: Facilities;
  user: User;
  coordinates: string;
}
