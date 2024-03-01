import CredentiasError from "../../domain/Errors/CredentiasError";
import UnauthorizedError from "../../domain/Errors/UnauthorizedError";
import {
  forbidden,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import TokenGenerator from "../../domain/entities/TokenGenerator";
import IUserRepository from "../repository/UserRepository";
import UseCase from "./UseCase";

export default class LoginAdmUseCase implements UseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findByEmail(params.email);
      if (user && user.typeUser.getValue() === "Bibliotecário") {
        const verifyPass = await user.validatePass(params.password);
        if (!verifyPass) return forbidden(new CredentiasError());
        const token = TokenGenerator.generate(user);
        return success({
          message: "User Logged",
          data: {
            id: user.id,
            user: user.name.getValue(),
            email: user.email.getValue(),
            registerCode: user.registerCode,
            typeUser: user.typeUser.getValue(),
            token: token,
          },
        });
      }
      return forbidden(new UnauthorizedError());
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
type Input = {
  email: string;
  password: string;
};
