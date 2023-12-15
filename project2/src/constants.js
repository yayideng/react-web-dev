export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_MESSAGE: 'required-message',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
    [SERVER.AUTH_INSUFFICIENT]: 'Sorry, DOGs are forbidden, please use another username.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (within 20 letters and/or numbers) username.',
    [SERVER.REQUIRED_MESSAGE]: 'Please enter message to send',
    default: 'Something went wrong.  Please try again',
  };
  