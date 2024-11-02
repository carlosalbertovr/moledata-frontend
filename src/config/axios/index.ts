import { fetchAuthSession } from "aws-amplify/auth";
import axios, { AxiosPromise } from "axios";

import { envConfig } from "../env";

/**
 * CustomAxiosRequest is a type alias for a function that takes an input of type I
 * and returns an AxiosPromise of type O.
 *
 * @template I - The type of the input arguments.
 * @template O - The type of the output response.
 */
export type CustomAxiosRequest<I, O> = (args: I) => AxiosPromise<O>;

/**
 * Pagination represents the structure of pagination information.
 *
 * @property {number} total - The total number of items.
 * @property {number} lastPage - The last page number.
 * @property {number} perPage - The number of items per page.
 * @property {number} currentPage - The current page number.
 * @property {number} nextPage - The next page number.
 * @property {number} prevPage - The previous page number.
 * @property {number} from - The starting item number on the current page.
 * @property {number} to - The ending item number on the current page.
 */
export type Pagination = {
	total: number;
	lastPage: number;
	perPage: number;
	currentPage: number;
	nextPage: number;
	prevPage: number;
	from: number;
	to: number;
};

/**
 * ApiPaginatedResponse represents the structure of a paginated API response.
 *
 * @template T - The type of the data in the response.
 * @property {T} data - The data returned by the API.
 * @property {Pagination} pagination - The pagination information.
 */
export type ApiPaginatedResponse<T> = {
	data: T;
};

// Create an instance of Axios
const axiosInstance = axios.create({
	baseURL: envConfig.API_URL,
});

// Add an interceptor to include the token in each request
axiosInstance.interceptors.request.use(async (config) => {
	const token = await fetchAuthSession();

	if (token.tokens?.idToken) {
		config.headers.Authorization = `Bearer ${token.tokens.idToken.toString()}`;
	}

	return config;
});

export default axiosInstance;
