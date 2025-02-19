import { City } from "./city.type";
import { HousingType } from "./housingType.type";

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
