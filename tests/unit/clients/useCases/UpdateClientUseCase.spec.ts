import { mock } from 'jest-mock-extended';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { ICityRepository } from '../../../../src/core/cities/repository/CityRepository';
import { Client } from '../../../../src/core/clients/domain/Client.entity';
import { Gender } from '../../../../src/core/clients/domain/Gender.enum';
import { IClientRepository } from '../../../../src/core/clients/repository/ClientRepository';
import { UpdateClientDto } from '../../../../src/core/clients/useCases/updateClient/UpdateClientDto';
import { UpdateClientUseCase } from '../../../../src/core/clients/useCases/updateClient/UpdateClientUseCase';
import { ClientNotFoundError } from '../../../../src/core/clients/errors/ClientNotFoundError';

describe('Caso de uso: UpdateClient', () => {
  it('Deve obter sucesso ao tentar atualizar um cliente', async () => {
    const mockClientRepo = mock<IClientRepository>();
    const mockCityRepo = mock<ICityRepository>();

    const useCase = new UpdateClientUseCase(mockClientRepo, mockCityRepo);

    const dto: UpdateClientDto = {
      clientId: 'mock-client-id',
      completeName: 'gustavo 2'
    };

    const mockCity = City.create({
      name: 'Campo Grande',
      state: 'MS'
    }).value as City;

    const mockClient = Client.create({
      completeName: 'gustavo',
      birthdate: new Date('1997/04/18'),
      city: mockCity,
      gender: Gender.MALE
    }).value as Client;

    mockClientRepo.findById.mockResolvedValue(mockClient);
    mockClientRepo.update.mockImplementation(async (client) => client);
    const response = await useCase.execute(dto);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeInstanceOf(Client);
    expect((response.value as Client).completeName).toBe(dto.completeName);
  });

  it('Deve retornar erro tentar atualizar um cliente inexistente', async () => {
    const mockClientRepo = mock<IClientRepository>();
    const mockCityRepo = mock<ICityRepository>();

    const useCase = new UpdateClientUseCase(mockClientRepo, mockCityRepo);

    const dto: UpdateClientDto = {
      clientId: 'non-existing-client',
      completeName: 'gustavo 2'
    };

    mockClientRepo.findById.mockResolvedValue(null);
    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ClientNotFoundError);
  });
});
