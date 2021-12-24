import axios from 'axios';
import { apiBaseUrl } from './config-sample';

export const fetchData = async <T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any = {},
  withCredentials = false
): Promise<T> => {
  return (await axios.get<T>(apiBaseUrl + path, { params, withCredentials }))
    .data;
};
