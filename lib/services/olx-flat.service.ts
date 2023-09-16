import dayjs from 'dayjs';
import { Api } from '../api';
import { Apartment, OlxApartment } from '../types';
import { DATE_FORMAT } from '../constants';

export class OlxFlatService {
  private api!: Api;

  private urlPreviewPrefix = 'https://ireland.apollo.olxcdn.com:443/v1/files';

  constructor() {
    this.api = new Api();
  }

  private getPreviewUrl(photos: OlxApartment['photos']): string {
    if (!photos.length) {
      return '';
    }

    const fileName = photos[0].filename;

    return `${this.urlPreviewPrefix}/${fileName}/image;s=300x300`;
  }

  private findParamsByName(
    apartmentParams: OlxApartment['params'],
    paramsName: string
  ) {
    return apartmentParams.find((params) => params.key === paramsName)?.value
      ?.label;
  }

  private getFullLocation(location: OlxApartment['location']) {
    return `${location.city?.name || ''} ${location.district?.name || ''}`.trim();
  }

  private parseList(list: OlxApartment[]): Apartment[] {
    return list.map((apartment) => {
      return {
        previewUrl: this.getPreviewUrl(apartment.photos),
        name: apartment.title,
        price: this.findParamsByName(apartment.params, 'price') || '',
        rooms: this.findParamsByName(apartment.params, 'rooms') || '',
        czynsz: this.findParamsByName(apartment.params, 'rent') || '',
        meters: this.findParamsByName(apartment.params, 'm') || '',
        location: this.getFullLocation(apartment.location),
        urlToApartment: apartment.url,
        createdAt: dayjs(apartment.created_time).format(DATE_FORMAT),
        validUntil: dayjs(apartment.valid_to_time).format(DATE_FORMAT),
      };
    });
  }

  async getOlxListApartments(): Promise<Apartment[]> {
    try {
      const { data } = await this.api.getOlxListApartments();

      return this.parseList(data.data);
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}
