import UnauthorizedError from "../../domain/Errors/UnauthorizedError";
import {
  forbidden,
  serverError,
  success,
} from "../../domain/Helpers/HttpHelper";
import HttpResponse from "../../domain/Protocols/HttpResponse";
import TokenGenerator from "../../domain/entities/TokenGenerator";
import UseCase from "./UseCase";

export default class VerifyToken implements UseCase {
  constructor() {}
  async execute(token: string): Promise<HttpResponse> {
    try {
      const payload = TokenGenerator.verify(token);
      if (!payload) {
        return forbidden(new UnauthorizedError());
      }
      return success({
        message: "Authorized",
        data: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          iat: payload.iat,
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
