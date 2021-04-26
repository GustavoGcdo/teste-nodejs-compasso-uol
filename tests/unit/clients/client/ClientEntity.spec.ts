import { InvalidCompleteNameError } from '../../../../src/core/clients/errors/InvalidCompleteNameError';
import { Client } from '../../../../src/core/clients/domain/Client.entity';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { Gender } from '../../../../src/core/clients/domain/Gender.enum';
import { InvalidBirthdateError } from '../../../../src/core/clients/errors/InvalidBirthdateError';
describe('Teste de entidade:  Client', () => {
  it('Deve retornar uma instancia de Client ao passar dados validos', () => {
    const city = City.create({ name: 'Campo Grande', state: 'Mato Grosso do Sul' }).value as City;

    const clientOrError = Client.create({
      completeName: 'client 1',
      birthdate: new Date(1997, 3, 18),
      city: city,
      gender: Gender.MALE
    });

    expect(clientOrError.isRight()).toBeTruthy();
    expect(clientOrError.value).toBeInstanceOf(Client);
  });

  it('Deve retornar erro ao tentar criar um Client com completeName invalido', () => {
    const city = City.create({ name: 'Campo Grande', state: 'Mato Grosso do Sul' }).value as City;

    const clientOrError = Client.create({
      completeName: '',
      birthdate: new Date(1997, 3, 18),
      city: city,
      gender: Gender.MALE
    });

    expect(clientOrError.isLeft()).toBeTruthy();
    expect(clientOrError.value).toBeInstanceOf(InvalidCompleteNameError);
  });

  it('Deve retornar erro ao tentar criar um Client com birthdate no futuro', () => {
    const city = City.create({ name: 'Campo Grande', state: 'Mato Grosso do Sul' }).value as City;

    const FUTURE_YEAR = new Date().getFullYear() + 5;

    const clientOrError = Client.create({
      completeName: 'client 1',
      birthdate: new Date(FUTURE_YEAR, 3, 18),
      city: city,
      gender: Gender.MALE
    });

    expect(clientOrError.isLeft()).toBeTruthy();
    expect(clientOrError.value).toBeInstanceOf(InvalidBirthdateError);
  });

  it('Deve retornar a idade correta de um Client', () => {
    const city = City.create({ name: 'Campo Grande', state: 'Mato Grosso do Sul' }).value as City;

    const EXPECTED_AGE = 24;

    const clientOrError = Client.create({
      completeName: 'client 1',
      birthdate: new Date(1997, 3, 18),
      city: city,
      gender: Gender.MALE
    });

    expect(clientOrError.isRight()).toBeTruthy();
    expect(clientOrError.value).toBeInstanceOf(Client);
    expect((clientOrError.value as Client).age).toBe(EXPECTED_AGE);
  });
});
