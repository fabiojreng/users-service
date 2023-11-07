import { Request, Response } from "express";
import GetUsersService from "../aplication/services/GetUserService";

export default class GetUserController {
  constructor(private getUserService: GetUsersService) {}
  async start(req: Request, res: Response): Promise<Response> {
    const user = await this.getUserService.execute(req.params.id);
    return res.json(user);
  }
}
