import { Gender } from './Gender';
import { City } from '../../cities/domain/City';

export class Client {
  private completeName: string;
  private gender: Gender;
  private birthDate: Date;
  private age: number;
  private city: City;
}
