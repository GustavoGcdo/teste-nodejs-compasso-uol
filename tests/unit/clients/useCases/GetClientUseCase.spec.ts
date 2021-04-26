import { mock } from 'jest-mock-extended';
import { City } from '../../../../src/core/cities/domain/City.entity';
import { Client } from '../../../../src/core/clients/domain/Client.entity';
import { Gender } from '../../../../src/core/clients/domain/Gender.enum';
import { IClientRepository } from '../../../../src/core/clients/repository/ClientRepository';
import { GetClientDto } from '../../../../src/core/clients/useCases/getClient/GetClientDto';
import { GetClientUseCase } from '../../../../src/core/clients/useCases/getClient/GetClientUseCase';
import { PaginateResult } from '../../../../src/shared/Paginate';

describe('Caso de uso: GetClient', () => {
  it('Deve obter sucesso ao buscar cliente por nome', async () => {
    const mockClientRepo = mock<IClientRepository>();

    const useCase = new GetClientUseCase(mockClientRepo);

    const dto: GetClientDto = {
      name: 'gustavo'
    };

    const mockCity = City.create({
      name: 'Campo Grande',
      state: 'MS'
    }).value as City;

    const mockClient = Client.create({
      completeName: 'gustavo',
      birthDate: new Date('1997/04/18'),
      city: mockCity,
      gender: Gender.MALE
    }).value as Client;

    mockClientRepo.searchPaginate.mockResolvedValue({ total: 1, results: [mockClient] });
    const response = await useCase.execute(dto);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toHaveProperty('total');
    expect(response.value).toHaveProperty('results');
    expect(Array.isArray((response.value as PaginateResult<Client>).results)).toBeTruthy();
  });
});
