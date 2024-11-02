import { fetchAuthSession } from "aws-amplify/auth";
import axios from "axios";

axios.interceptors.request.use(async (config) => {
	const token = await fetchAuthSession();

	console.log("token", token);

	if (token.tokens?.idToken) {
		config.headers.Authorization = `Bearer ${token.tokens.idToken.toString()}`;
	}

	return config;
});
