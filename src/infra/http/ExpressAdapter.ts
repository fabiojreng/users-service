import express, { Request, Response } from "express";
import cors from "cors";
import HttpServer from "./HttpServer";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "../../swagger.json";
import HttpResponse from "../../domain/Protocols/HttpResponse";

export default class ExpressAdapter implements HttpServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      "/documentation",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocs)
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  register(method: string, url: string, callback: Function): any {
    return this.app[method](url, async function (req: Request, res: Response) {
      try {
        const output: HttpResponse = await callback(req);
        res.status(output.statusCode).json(output.body);
      } catch (error) {
        // if (error instanceof Error) res.status(400).json(error.message);
        // res.status(400).json('Unexpected error');
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`SERVER RUNNING IN PORT ${port}`);
    });
  }
}
