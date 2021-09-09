export const environments = {
  local: {
    production: false,
    disableCors: true,
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_gmZ6kAJzv',
      userPoolWebClientId: '7fr4rob9e3hqn4vsau3qaou6u',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_SRP_AUTH',
      oauth: {
        domain: 'auth.sammy.link',
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: 'http://localhost:4200',
        redirectSignOut: 'http://localhost:4200',
        responseType: 'code',
      },
    },
    API_URL: 'http://localhost:3000',
    BASE_URL: 'http://localhost:4200/',
  },
  prod: {
    Auth: {
      region: 'us-east-1',
      userPoolId: 'us-east-1_gmZ6kAJzv',
      userPoolWebClientId: '7fr4rob9e3hqn4vsau3qaou6u',
      mandatorySignIn: true,
      authenticationFlowType: 'USER_SRP_AUTH',
      oauth: {
        domain: 'auth.sammy.link',
        scope: [
          'email',
          'profile',
          'openid',
          'aws.cognito.signin.user.admin',
          'sammylink/api.all',
        ],
        redirectSignIn: 'https://sammy.link',
        redirectSignOut: 'https://sammy.link',
        responseType: 'code',
      },
    },
    API_URL: 'https://api.sammy.link',
    BASE_URL: 'https://sammy.link/',
  },
};
