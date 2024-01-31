import CreateUserUseCase from "../../aplication/useCases/CreateUserUseCase";
import GetAllUsersUseCase from "../../aplication/useCases/GetAllUserUseCase";
import GetUserUseCase from "../../aplication/useCases/GetUserUseCase";
import LoginUserUseCase from "../../aplication/useCases/LoginUserUseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    private createUser: CreateUserUseCase,
    private getUser: GetUserUseCase,
    private getAllUsers: GetAllUsersUseCase,
    private loginUser: LoginUserUseCase,
    private httpServer: HttpServer
  ) {
    httpServer.register("post", "/user", async function (req: any) {
      try {
        await createUser.execute(req.body);
        return { statusCode: 201, body: { msg: "User created" } };
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    });
    httpServer.register("get", "/user/:id", async function (req: any) {
      try {
        const user = await getUser.execute(req.params.id);
        return { statusCode: 200, body: user };
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    });
    httpServer.register("get", "/users", async function () {
      try {
        const users = await getAllUsers.execute();
        return { statusCode: 200, body: users };
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    });
    httpServer.register("post", "/login", async function (req: any) {
      const token = await loginUser.execute(req.body);
      return {
        statusCode: 200,
        body: {
          msg: "User authenticated",
          token: token,
        },
      };
    });
  }
}
