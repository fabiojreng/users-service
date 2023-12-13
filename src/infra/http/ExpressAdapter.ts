import express, { Request, Response } from "express";
import HttpServer from "./HttpServer";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "/home/fabiojunior/Área de Trabalho/users-service/src/swagger.json";

export default class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      "/documentation",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocs)
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  register(method: string, url: string, callback: Function): void {
    return this.app[method](url, async function (req: Request, res: Response) {
      try {
        const { statusCode, body } = await callback(req.params, req.body);
        res.status(statusCode).send(body);
      } catch (error) {
        if (error instanceof Error) res.status(400).send(error.message);
        res.status(400).send("Unexpected error");
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`SERVER RUNNING IN PORT ${port}`);
    });
  }
}
