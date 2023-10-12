import {api} from 'http-module';

export interface IUserResponse {
  name: string;
  email: string;
};

export interface ILoginUser {
  email: string;
  password: string;
};

export interface ISignUpUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const fetchUsers = async(): Promise<IUserResponse> => {
  const response = await api.get<IUserResponse>('/read-user');
  return response.data;
};

export const login = async(user: ILoginUser): Promise<Number> => {
  const response = await api.post('/login-user', user);
  return response.status;
};
