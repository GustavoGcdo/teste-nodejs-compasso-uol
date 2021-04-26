import { Either, left, right } from '../../../shared/Either';
import { UniqueId } from '../../../shared/UniqueId';
import { City } from '../../cities/domain/City.entity';
import { InvalidBirthdateError } from '../errors/InvalidBirthdateError';
import { InvalidCompleteNameError } from '../errors/InvalidCompleteNameError';
import { Gender } from './Gender.enum';

export type ClientProps = {
  completeName: string;
  gender: Gender;
  birthdate: Date;
  city: City;
};
export class Client {
  private props: ClientProps;
  private _id: UniqueId;

  private constructor(props: ClientProps, id?: UniqueId) {
    this.props = props;
    if (id) this._id = id;
  }

  public static create(
    props: ClientProps,
    id?: UniqueId
  ): Either<InvalidCompleteNameError | InvalidBirthdateError, Client> {
    if (!Client.isValidCompleteName(props.completeName)) {
      return left(new InvalidCompleteNameError());
    }

    if (!Client.isValidBirthdate(props.birthdate)) {
      return left(new InvalidBirthdateError());
    }

    return right(new Client(props, id));
  }

  public get id(): UniqueId {
    return this._id;
  }

  public get age(): number {
    const actualDateYear = new Date().getFullYear();
    const birthdateYear = this.props.birthdate.getFullYear();

    return actualDateYear - birthdateYear;
  }

  public get completeName(): string {
    return this.props.completeName;
  }

  setCompleteName(name: string): Either<InvalidCompleteNameError, null> {
    if (Client.isValidCompleteName(name)) {
      this.props.completeName = name;
      return right(null);
    }

    return left(new InvalidCompleteNameError());
  }

  public get birthdate(): Date {
    return this.props.birthdate;
  }

  setBirthdate(date: Date): Either<InvalidBirthdateError, null> {
    if (Client.isValidBirthdate(date)) {
      this.props.birthdate = date;
      return right(null);
    }

    return left(new InvalidBirthdateError());
  }

  public get city(): City {
    return this.props.city;
  }

  setCity(city: City) {
    this.props.city = city;
  }

  public get gender(): Gender {
    return this.props.gender;
  }

  setGender(gender: Gender) {
    this.props.gender = gender;
  }

  private static isValidCompleteName(name: string): boolean {
    if (!name || name.trim().length === 0) {
      return false;
    }
    return true;
  }

  private static isValidBirthdate(date: Date): boolean {
    if (
      !date ||
      date.toString() === 'Invalid Date' ||
      date.getFullYear() >= new Date().getFullYear()
    ) {
      return false;
    }
    return true;
  }
}
