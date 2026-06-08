export class PetApiClient {
  constructor(
    private baseUrl = 'https://petstore.swagger.io/v2'
  ) {}

  async getPetById(id: number) {
    const res = await fetch(`${this.baseUrl}/pet/${id}`);
    return res.json();
  }
}