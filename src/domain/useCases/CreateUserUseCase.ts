import User from "../entities/User";

export interface ICreateUserParams {
  name: string;
  email: string;
  password: string;
  registerCode: string;
  course: string;
  typeUser: string;
}

export default interface ICreateUserUseCase {
  execute(params: ICreateUserParams): Promise<User>;
}
