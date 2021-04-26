import { mock } from 'jest-mock-extended';
import { CreateClientUseCase } from '../../../../src/core/clients/useCases/createClient/CreateClientUseCase';
import { ICityRepository } from '../../../../src/core/cities/repository/CityRepository';
import { IClientRepository } from '../../../../src/core/clients/repository/ClientRepository';
import { CreateClientDto } from '../../../../src/core/clients/useCases/createClient/CreateClientDto';
import { Client } from '../../../../src/core/clients/domain/Client.entity';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { CityNotFoundError } from '../../../../src/core/cities/errors/CityNotFoundError';
import { InvalidBirthdateError } from '../../../../src/core/clients/errors/InvalidBirthdateError';
import { AppError } from '../../../../src/shared/AppError';

describe('Caso de uso: CreateClient', () => {
  it('Deve obter sucesso ao tentar cadastrar um cliente com dados validos', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const mockClientRepo = mock<IClientRepository>();
    const useCase = new CreateClientUseCase(mockCityRepo, mockClientRepo);

    const dto: CreateClientDto = {
      birthdate: '1997/04/18',
      cityId: 'mockCityid',
      completeName: 'Gustavo Candido de Oliveira',
      gender: 'male'
    };

    mockCityRepo.findById.mockResolvedValue({} as City);
    mockClientRepo.create.mockImplementation(async client => client);

    const response = await useCase.execute(dto);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeInstanceOf(Client);
  });

  it('Deve retornar erro ao tentar cadastrar um cliente passando uma cidade inexistente', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const mockClientRepo = mock<IClientRepository>();
    const useCase = new CreateClientUseCase(mockCityRepo, mockClientRepo);

    const dto: CreateClientDto = {
      birthdate: '1997/04/18',
      cityId: 'non-existing-city',
      completeName: 'Gustavo Candido de Oliveira',
      gender: 'male'
    };

    mockCityRepo.findById.mockResolvedValue(null);

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(CityNotFoundError);
  });

  it('Deve retornar erro ao tentar cadastrar um cliente passando uma data de nascimento invalida', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const mockClientRepo = mock<IClientRepository>();
    const useCase = new CreateClientUseCase(mockCityRepo, mockClientRepo);

    const dto: CreateClientDto = {
      birthdate: 'datainvalida',
      cityId: 'mockCityid',
      completeName: 'Gustavo Candido de Oliveira',
      gender: 'male'
    };

    mockCityRepo.findById.mockResolvedValue({} as City);

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(InvalidBirthdateError);
  });

  it('Deve retornar erro ao tentar cadastrar um cliente e não conseguir salvar', async () => {
    const mockCityRepo = mock<ICityRepository>();
    const mockClientRepo = mock<IClientRepository>();
    const useCase = new CreateClientUseCase(mockCityRepo, mockClientRepo);

    const dto: CreateClientDto = {
      birthdate: '1997/04/18',
      cityId: 'mockCityid',
      completeName: 'Gustavo Candido de Oliveira',
      gender: 'male'
    };

    mockCityRepo.findById.mockResolvedValue({} as City);
    mockClientRepo.create.mockRejectedValue(new Error());

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(AppError.UnexpectedError);
  });
});
