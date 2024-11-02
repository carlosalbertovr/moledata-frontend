import { Amplify } from "aws-amplify";

import { envConfig } from "../env";

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolClientId: envConfig.USER_POOL_CLIENT_ID,
			userPoolId: envConfig.USER_POOL_ID,
			loginWith: {
				oauth: {
					domain: envConfig.COGNITO_OAUTH_DOMAIN,
					scopes: ["email", "openid", "profile", "aws.cognito.signin.user.admin"],
					redirectSignIn: [window.origin],
					redirectSignOut: [window.origin],
					responseType: "code",
					providers: ["Google"],
				},
			},
		},
	},
});
