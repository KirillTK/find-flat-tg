import axios, { AxiosResponse } from 'axios';
import { OlxApartment } from '../types';

// https://www.olx.pl/api/v1/offers/?offset=0&limit=40&query=flat%20for%20rent&category_id=15&region_id=2&city_id=17871&filter_float_price%3Ato=4800&filter_refiners=spell_checker&suggest_filters=true&sl=186b143b17ex79b1bddd

export class Api {
  getOlxListApartments(): Promise<AxiosResponse<{ data: OlxApartment[] }>> {
    return axios.get(
      'https://www.olx.pl/api/v1/offers/?offset=0&limit=40&query=flat%20for%20rent&category_id=15&region_id=2&city_id=17871&filter_float_price%3Ato=4800&filter_refiners=spell_checker&suggest_filters=true&sl=186b143b17ex79b1bddd'
    );
  }
}
