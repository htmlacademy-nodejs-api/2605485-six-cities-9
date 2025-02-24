import {
  CityType,
  UserType,
  HousingTypeEnum,
  FacilitiesEnum,
  CoordinatesType
} from './index.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityType;
  image: string;
  images: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  housingType: HousingTypeEnum;
  rooms: number;
  guests: number;
  price: number;
  facilities: FacilitiesEnum[];
  user: UserType;
  coordinates: CoordinatesType;
}
