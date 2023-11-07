import { Request, Response } from "express";
import GetAllUsersService from "../aplication/services/GetAllUsersService";

export default class GetAllUsersController {
  constructor(private getAllUsersService: GetAllUsersService) {}
  async start(req: Request, res: Response) {
    try {
      const users = await this.getAllUsersService.execute();
      res.json({ users });
    } catch (error) {
      res.json({ error });
    }
  }
}
