import { EmailInUseError } from "../../domain/Errors/EmailInUseError";
import UnauthorizedError from "../../domain/Errors/UnauthorizedError";
import {
  forbidden,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import User from "../../domain/entities/User";
import IUserRepository from "../repository/UserRepository";
import UseCase from "./UseCase";

export interface ICreateUserParams {
  name: string;
  email: string;
  password: string;
  registerCode: string;
  typeUser: string;
}

export default class CreateUserUseCase implements UseCase {
  constructor(private createUserRepository: IUserRepository) {}
  async execute(params: ICreateUserParams): Promise<HttpResponse> {
    try {
      const userExits = await this.createUserRepository.findByEmail(
        params.email
      );
      if (userExits) return forbidden(new EmailInUseError());
      const validTypes = ["Aluno", "Professor"];
      if (!validTypes.includes(params.typeUser)) {
        return forbidden(new UnauthorizedError());
      }
      const user = await User.create(
        params.name,
        params.email,
        params.password,
        params.registerCode,
        params.typeUser
      );
      await this.createUserRepository.save(user);
      return success({
        message: "User created successfully",
        data: {
          id: user.id,
          user: user.name.getValue(),
          email: user.email.getValue(),
          registerCode: user.registerCode,
          typeUser: user.typeUser.getValue(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error);
      }
      return serverError(new Error("Unexpected Error"));
    }
  }
}
