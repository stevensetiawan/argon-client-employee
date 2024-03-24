export interface User {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;

  [key: string]: unknown;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}
