import { InvalidCityNameError } from './../../../../src/core/cities/errors/InvalidCityNameError';
import { CreateCityUseCase } from '../../../../src/core/cities/useCases/CreateCityUseCase';
import { mock } from 'jest-mock-extended';
import { ICityRepository } from '../../../../src/core/cities/repository/CityRepository';
import { CreateCityDto } from '../../../../src/core/cities/useCases/CreateCityDto';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { AppError } from '../../../../src/shared/AppError';

describe('Caso de uso: CreateCity', () => {
  it('Deve obter sucesso ao tentar cadastrar uma cidade', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const useCase = new CreateCityUseCase(mockCityRepo);

    const dto: CreateCityDto = {
      name: 'Campo Grande',
      state: 'MS'
    };

    mockCityRepo.save.mockImplementation(async (city) => city);
    const jestSpySaveMethod = jest.spyOn(mockCityRepo, 'save');

    const response = await useCase.execute(dto);

    expect(jestSpySaveMethod).toHaveBeenCalled();
    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeInstanceOf(City);
  });

  it('Deve falhar ao tentar cadastrar uma cidade com dados invalidos', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const useCase = new CreateCityUseCase(mockCityRepo);

    const dto: CreateCityDto = {
      name: '',
      state: 'MS'
    };

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidCityNameError);
  });

  it('Deve retornar erro ao tentar cadastrar uma cidade e não conseguir salvar', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const useCase = new CreateCityUseCase(mockCityRepo);

    const dto: CreateCityDto = {
      name: 'Campo Grande',
      state: 'MS'
    };

    mockCityRepo.save.mockImplementation(() => { throw new Error() })

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(AppError.UnexpectedError);
  });
});
