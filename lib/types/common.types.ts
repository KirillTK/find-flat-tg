import { AxiosResponse } from 'axios';

export type HttpResponse<T> = Promise<AxiosResponse<T>>;
