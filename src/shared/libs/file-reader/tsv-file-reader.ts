import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { City, User, Offer } from '../../types/index.js';
import { HousingType } from "../../types/housing-type.enum.js";
import { UserType } from "../../types/user-type.type.js";

export class TSVFileReader implements FileReader {
  private rawData = '';
  private str_separator = '\t';
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
      housingImages,
      // premium,
      // favorite,
      rating,
      housingType,
      rooms,
      guests,
      price,
      facilities,
      name,
      email,
      avatarPath,
      password,
      userType,
      coordinates,
    ] = line.split(this.str_separator);

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: City[city as  'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
      image,
      housingImages,
      premium: Boolean(),
      favorite: Boolean(),
      rating: this.parseNumber(rating),
      housingType: HousingType[housingType as 'apartment' | 'house' | 'room' | 'hotel'],
      rooms: this.parseNumber(rooms),
      guests: this.parseNumber(guests),
      price: this.parseNumber(price),
      facilities: this.parseFacilities(facilities),
      user: this.parseUser(name, email, avatarPath, password, UserType[userType as 'usual' | 'pro']),
      coordinates
    };
  }

  private parseFacilities(facilitiesString: string): { name: string }[] {
    return facilitiesString.split(this.prop_separator).map((name) => ({ name }));
  }

  private parseNumber(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseUser(name: string, email: string, avatarPath: string, password: string, type: UserType): User {
    return { name, email, avatarPath, password, type };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
