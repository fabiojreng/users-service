import GetUsersService from "../aplication/services/GetUserService";
import {
  HttpRequest,
  HttpResponse,
  IController,
} from "./HttpAdapterController";

export default class GetUserController implements IController {
  constructor(private getUserService: GetUsersService) {}
  async start(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<unknown>> {
    try {
      const user = await this.getUserService.execute(httpRequest.params.id);
      return { statusCode: 200, body: user };
    } catch (error) {
      if (error instanceof Error)
        return { statusCode: 400, body: error.message };
      return { statusCode: 500, body: error };
    }
  }
}
