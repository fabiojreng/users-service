import IUserRepository from "../repository/UserRepository";
import TokenGenerator from "../../domain/entities/TokenGenerator";
import HttpResponse from "../../domain/Protocols/Http";
import {
  forbidden,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import CredentiasError from "../../domain/Errors/CredentiasError";
import UseCase from "./UseCase";

export default class LoginUserUseCase implements UseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findByEmail(params.email);
      if (user) {
        const verifyPass = await user.validatePass(params.password);
        if (!verifyPass) return forbidden(new CredentiasError());
        const token = TokenGenerator.generate(user);
        return success({ message: "User Logged", data: token });
      }

      return forbidden(new CredentiasError());
    } catch (error) {
      if (error instanceof Error) {
        return serverError(error);
      }
      return serverError(new Error("Unexpected Error"));
    }
  }
}

type Input = {
  email: string;
  password: string;
};
