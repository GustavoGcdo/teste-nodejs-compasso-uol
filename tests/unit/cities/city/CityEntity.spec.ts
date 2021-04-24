import { InvalidCityNameError } from '../../../../src/core/cities/errors/InvalidCityNameError';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { InvalidStateNameError } from '../../../../src/core/cities/errors/InvalidStateNameError';

describe('Teste de entidade: City', () => {
  it('Deve retornar uma instancia de City ao passar dados validos', () => {
    const cityOrError = City.create({
      name: 'validName',
      state: 'validState'
    });

    expect(cityOrError.isRight()).toBeTruthy();
    expect(cityOrError.value).toBeInstanceOf(City);
  });

  it('Deve retornar erro ao passar um nome de cidade invalido', () => {
    const cityOrError = City.create({
      name: '',
      state: 'validState'
    });

    expect(cityOrError.isLeft()).toBeTruthy();
    expect(cityOrError.value).toBeInstanceOf(InvalidCityNameError);
  });

  it('Deve retornar erro ao passar um nome de estado invalido', () => {
    const cityOrError = City.create({
      name: 'validCityName',
      state: ''
    });

    expect(cityOrError.isLeft()).toBeTruthy();
    expect(cityOrError.value).toBeInstanceOf(InvalidStateNameError);
  });
});
