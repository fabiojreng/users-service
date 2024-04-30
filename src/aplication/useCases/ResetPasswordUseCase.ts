import CredentiasError from "../../domain/Errors/CredentiasError";
import InvalidParamError from "../../domain/Errors/InvalidParamError";
import MissingParamError from "../../domain/Errors/MissingParamError";
import ResetPasswordInvalid from "../../domain/Errors/ResetPasswordInvalid";
import UnauthorizedError from "../../domain/Errors/UnauthorizedError";
import {
  forbidden,
  notFound,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import Password from "../../domain/VO/Password";
import IUserRepository from "../../domain/repository/UserRepository";
import UseCase from "./UseCase";

export default class ResetPassword implements UseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    try {
      const user = await this.userRepository.findByEmail(params.email);
      if (!user) return forbidden(new UnauthorizedError());
      if (
        params.currentPassword.trim() === "" ||
        params.newPassword.trim() === "" ||
        params.confirmPassword.trim() === ""
      )
        return notFound(
          new MissingParamError(
            "currentPassword or newPassword or confirmePassword"
          )
        );
      const verifyPass = await user.validatePass(params.currentPassword);
      if (!verifyPass) return forbidden(new CredentiasError());
      if (params.newPassword != params.confirmPassword)
        return forbidden(new ResetPasswordInvalid());
      const newPassword = new Password(params.newPassword).getValue();
      await this.userRepository.updatePassword(user.id, newPassword);
      return success({
        message: "Password restored successfully",
        data: null,
      });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
type Input = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
