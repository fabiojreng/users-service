import NotFoundError from "../../domain/Errors/NotFoundError";
import {
  notFound,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import IUserRepository from "../repository/UserRepository";

export interface Output {
  id: string;
  name: string;
  email: string;
  password: string;
  registerCode: string;
  typeUser: string;
  createdAt: Date;
}

export default class GetUserUseCase {
  constructor(private getUserRepository: IUserRepository) {}
  async execute(id: string): Promise<HttpResponse> {
    try {
      const user = await this.getUserRepository.findById(id);
      if (!user) return notFound(new NotFoundError());
      return success({
        message: "User",
        data: {
          id: user.id,
          name: user.name.getValue(),
          email: user.email.getValue(),
          registerCode: user.registerCode,
          typeUser: user.typeUser.getValue(),
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      if (error instanceof Error) return serverError(error);
      return serverError(new Error("Unexpected Error"));
    }
  }
}
