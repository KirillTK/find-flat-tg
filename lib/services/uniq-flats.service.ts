import { Apartment } from '../types';

export class UniqFlatsService {
  private uniq = new Set();

  getUniqApartments(apartments: Apartment[]) {
    return apartments.filter((apartment) => {
      if (this.uniq.has(apartment.urlToApartment)) {
        return false;
      }

      this.uniq.add(apartment.urlToApartment);

      return true;
    });
  }

  reset() {
    this.uniq = new Set();
  }
}
