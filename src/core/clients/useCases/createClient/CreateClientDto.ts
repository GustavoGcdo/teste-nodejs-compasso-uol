export interface CreateClientDto {
    completeName: string;
    gender: 'male' | 'female' | 'other';
    bithdate: string;
    cityId: string | number;
}
