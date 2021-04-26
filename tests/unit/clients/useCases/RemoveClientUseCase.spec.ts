import { mock } from 'jest-mock-extended';
import { Client } from '../../../../src/core/clients/domain/Client.entity';
import { IClientRepository } from '../../../../src/core/clients/repository/ClientRepository';
import { RemoveClientDto } from '../../../../src/core/clients/useCases/removeClient/RemoveClientDto';
import { RemoveClientUseCase } from '../../../../src/core/clients/useCases/removeClient/RemoveClientUseCase';
import { ClientNotFoundError } from '../../../../src/core/clients/errors/ClientNotFoundError';

describe('Caso de uso: RemoveClient', () => {
  it('Deve obter sucesso ao remover cliente', async () => {
    const mockClientRepo = mock<IClientRepository>();

    const useCase = new RemoveClientUseCase(mockClientRepo);

    const dto: RemoveClientDto = {
      id: 'mock-id-client'
    };

    mockClientRepo.findById.mockResolvedValue({} as Client);

    const response = await useCase.execute(dto);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toBeNull();
  });

  it('Deve retornar erro ao tentar remover cliente inexistente', async () => {
    const mockClientRepo = mock<IClientRepository>();

    const useCase = new RemoveClientUseCase(mockClientRepo);

    const dto: RemoveClientDto = {
      id: 'non-existing-user'
    };

    mockClientRepo.findById.mockResolvedValue(null);

    const response = await useCase.execute(dto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(ClientNotFoundError);
  });
});
