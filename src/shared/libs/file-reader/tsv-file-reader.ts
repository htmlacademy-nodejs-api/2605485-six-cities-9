import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  Offer,
  CityType,
  UserType,
  HousingTypeEnum,
  FacilitiesEnum,
  CoordinatesType
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';
  private ent_separator = '\t';
  private prop_separator = ';';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      image,
      images,
      premium,
      // favorite,
      rating,
      housingType,
      rooms,
      guests,
      price,
      facilities,
      user,
      coordinates,
    ] = line.split(this.ent_separator);

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: city as CityType,
      image,
      images: this.parseImages(images),
      premium: this.parseBoolean(premium),
      // favorite: this.parseBoolean(favorite),
      rating: Number(parseFloat(rating).toFixed(1)),
      housingType: housingType as HousingTypeEnum,
      rooms: Number(rooms),
      guests: Number(guests),
      price: Number(price),
      facilities: this.parseFacilities(facilities),
      user: this.parseUser(user),
      coordinates:this.parseCoordinates(coordinates),
    };
  }

  private parseImages(imagesString: string): string[] {
    return imagesString.split(this.prop_separator);
  }

  private parseBoolean(boolString: string): boolean {
    return boolString.toLowerCase() === 'true';
  }

  private parseFacilities(facilitiesString: string): FacilitiesEnum[] {
    return facilitiesString.split(this.prop_separator) as FacilitiesEnum[];
  }

  private parseUser(userString: string): UserType {
    let [name, email, avatarPath, password, isPro] = userString.split(this.prop_separator);
    return { name, email, avatarPath, password, isPro: isPro.toLowerCase() === 'true' };
  }

  private parseCoordinates(coordinates: string): CoordinatesType {
    let [lat, long] = coordinates.split(this.prop_separator);
    return { lat: Number(lat), long: Number(long) };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
