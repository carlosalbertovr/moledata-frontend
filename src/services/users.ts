import axiosInstance, { CustomAxiosRequest } from "../config/axios";
import { UserCreateInput, UserOutput } from "../types/users";

export const registerUser: CustomAxiosRequest<UserCreateInput, UserOutput> = async (data) => {
	const response = axiosInstance({
		url: "users",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify(data),
	});

	return response;
};

export const getMyProfile: CustomAxiosRequest<void, UserOutput> = async () => {
	const response = await axiosInstance({
		url: "users/profile/my-profile",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	return response;
};
