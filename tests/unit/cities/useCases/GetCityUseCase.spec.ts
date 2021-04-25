import { mock } from 'jest-mock-extended';
import { GetCityUseCase } from '../../../../src/core/cities/useCases/getCity/GetCityUseCase';
import { ICityRepository } from '../../../../src/core/cities/repository/CityRepository';
import { GetCityDto } from '../../../../src/core/cities/useCases/getCity/GetCityDto';
import { PaginateResult } from '../../../../src/shared/Paginate';
import { City } from '../../../../src/core/cities/domain/City.entity';
describe('Caso de uso: GetCity', () => {
  it('Deve obter sucesso ao buscar cidade por nome', async () => {
    const mockCityRepo = mock<ICityRepository>();

    const useCase = new GetCityUseCase(mockCityRepo);

    const dto: GetCityDto = {
      name: 'Campo Grande'
    };

    const mockCity = City.create({
      name: 'Campo Grande',
      state: 'MS'
    }).value as City;

    mockCityRepo.searchPaginate.mockResolvedValue({ total: 1, results: [mockCity] })
    const response = await useCase.execute(dto);

    expect(response.isRight()).toBeTruthy();
    expect(response.value).toHaveProperty('total');
    expect(response.value).toHaveProperty('results');
    expect(Array.isArray((response.value as PaginateResult<City>).results)).toBeTruthy();
  });
});
