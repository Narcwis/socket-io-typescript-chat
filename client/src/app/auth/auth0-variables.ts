interface AuthConfig {
    clientID: string;
    domain: string;
    localCallbackURL: string;
    hostedCallbackURL: string;
    environment: Environment;
    getCallBackURL(): string;
}

export enum Environment {
    Local,
    Hosted
}

export const AUTH_CONFIG: AuthConfig = {
    clientID: 'zcT96ZzfDzvYaKkXUk6sh2rWNyCsTqMt',
    domain: 'alcumus-chat.eu.auth0.com',
    localCallbackURL: 'https://localhost:4200/callback',
    hostedCallbackURL: 'https://alcumus-chat.firebaseapp.com/callback',
    environment: Environment.Hosted,
    getCallBackURL(): string {
        if (this.environment === Environment.Local) {
            return this.localCallbackURL;
        } else {
            return this.hostedCallbackURL;
        }
    }
}
