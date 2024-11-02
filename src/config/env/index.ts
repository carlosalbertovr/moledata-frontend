import { devConfig } from "./dev";
import { localConfig } from "./local";

interface BaseEnvConfigurationType {
	ENV_NAME: "prod" | "dev" | "local";
	ENV_TYPE: "production" | "development" | "local";
	API_URL: string;
	WEB_URL: string;
	REACT_QUERY_DEFAULT_CACHE_TIME: number;
	SESSION_STORAGE_POST_SIGN_IN_REDIRECT: string;
	USER_POOL_ID: string;
	USER_POOL_CLIENT_ID: string;
	COGNITO_OAUTH_DOMAIN: string;
}

const commonConfig = {
	REACT_QUERY_DEFAULT_CACHE_TIME: 60000,
	SESSION_STORAGE_POST_SIGN_IN_REDIRECT: "postSignInRedirect",
};

export type EnvConfigurationType = Omit<BaseEnvConfigurationType, keyof typeof commonConfig>;

const staticConfigs = [localConfig, devConfig];

const runConfig = () => {
	const envMatch = staticConfigs.find((it) => it.WEB_URL === window.location.origin);

	if (import.meta.env.PROD && envMatch) {
		return { ...commonConfig, ...envMatch };
	} else {
		return { ...commonConfig, ...localConfig };
	}
};

export const envConfig = runConfig();
