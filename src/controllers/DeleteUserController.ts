import DeleteUserUseCase from "../aplication/useCases/DeleteUserUseCase";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "./HttpAdapterController";

export default class DeleteUserController implements IController {
  constructor(private deleteUser: DeleteUserUseCase) {}
  async start(
    httpRequest?: HttpRequest<unknown> | undefined
  ): Promise<HttpResponse<unknown>> {
    try {
      await this.deleteUser.execute(httpRequest?.params.id);
      return { statusCode: 200, body: "User deleted successfully" };
    } catch (error) {
      if (error instanceof Error)
        return { statusCode: 400, body: error.message };
      return { statusCode: 400, body: "Unexpected error" };
    }
  }
}
