import { Gender } from './Gender';
import { City } from '../../cities/domain/City';
import { UniqueId } from '../../../shared/UniqueId';
import { left, Either, right } from '../../../shared/Either';
import { InvalidCompleteNameError } from '../errors/InvalidCompleteNameError';
import { InvalidBirthdateError } from '../errors/InvalidBirthdateError';

export type ClientProps = {
  completeName: string;
  gender: Gender;
  birthDate: Date;
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
  ): Either<InvalidCompleteNameError, Client> {
    if (!props.completeName || props.completeName.trim().length === 0) {
      return left(new InvalidCompleteNameError());
    }

    if (
      !props.birthDate ||
      props.birthDate.toString() === 'Invalid Date' ||
      props.birthDate.getFullYear() >= new Date().getFullYear()
    ) {
      return left(new InvalidBirthdateError());
    }

    return right(new Client(props, id));
  }

  public get age(): number {
    const actualDateYear = new Date().getFullYear();
    const birthdateYear = this.props.birthDate.getFullYear();

    return actualDateYear - birthdateYear;
  }
}
