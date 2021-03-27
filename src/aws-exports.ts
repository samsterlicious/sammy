const AWS_INFO = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_gmZ6kAJzv',
    userPoolWebClientId: '7fr4rob9e3hqn4vsau3qaou6u',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH',
    oauth: {
      domain: 'your_cognito_domain',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code'
    },
  },
};

export default AWS_INFO;
