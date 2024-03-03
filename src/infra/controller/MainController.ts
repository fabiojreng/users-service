import UseCase from "../../aplication/useCases/UseCase";
import HttpServer from "../http/HttpServer";

export default class MainController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createUser: UseCase,
    readonly getUser: UseCase,
    readonly getAllUsers: UseCase,
    readonly loginUser: UseCase,
    readonly loginAdm: UseCase,
    readonly resetPassword: UseCase,
    readonly verifyToken: UseCase
  ) {
    this.httpServer?.register("get", "/", async () => {
      return {
        statusCode: 200,
        body: {
          message: "Bem Vindo a API de Usuários",
        },
      };
    });
    this.httpServer?.register("post", "/user", async (req: any) => {
      const output = await this.createUser.execute(req.body);
      return output;
    });
    this.httpServer?.register("get", "/user/:id", async (req: any) => {
      const output = await this.getUser.execute(req.params.id);
      return output;
    });
    this.httpServer?.register("get", "/users", async (req: any) => {
      const output = await this.getAllUsers.execute(req);
      return output;
    });
    this.httpServer?.register("post", "/login", async (req: any) => {
      const output = await this.loginUser.execute(req.body);
      return output;
    });
    this.httpServer?.register("post", "/login/adm", async (req: any) => {
      const output = await this.loginAdm.execute(req.body);
      return output;
    });
    this.httpServer?.register("post", "/check", async (req: any) => {
      const output = await this.verifyToken.execute(req.body.token);
      return output;
    });
    this.httpServer?.register("post", "/reset-password", async (req: any) => {
      const output = await this.resetPassword.execute(req.body);
      return output;
    });
  }
}
