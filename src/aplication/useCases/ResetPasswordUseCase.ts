import CredentiasError from "../../domain/Errors/CredentiasError";
import UnauthorizedError from "../../domain/Errors/UnauthorizedError";
import { forbidden, success } from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import Pass from "../../domain/VO/Pass";
import Password from "../../domain/VO/Password";
import IUserRepository from "../repository/UserRepository";
import UseCase from "./UseCase";

export default class ResetPassword implements UseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(params: Input): Promise<HttpResponse> {
    const user = await this.userRepository.findByEmail(params.email);
    if (user) {
      const verifyPass = await user.validatePass(params.currentPassword);
      if (!verifyPass) return forbidden(new CredentiasError());
      if (params.newPassword != params.confirmPassword)
        return forbidden(new CredentiasError());
      const newPassword = new Password(params.newPassword).getValue();
      await this.userRepository.updatePassword(user.id, newPassword);
      return success({
        message: "Password restored successfully",
        data: null,
      });
    }
    return forbidden(new UnauthorizedError());
  }
}
type Input = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
