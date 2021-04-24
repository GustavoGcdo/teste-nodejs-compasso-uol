import { Gender } from './gender';
import { City } from '../../cities/domain/city';

export class Client {
  private completeName: string;
  private gender: Gender;
  private birthDate: Date;
  private age: number;
  private city: City;
}
