export interface CreateClientDto {
    completeName: string;
    gender: 'male' | 'female' | 'other';
    birthdate: string;
    cityId: string | number;
}
