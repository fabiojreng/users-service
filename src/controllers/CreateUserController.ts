import { Request, Response } from "express";
import ICreateUserUseCase from "../aplication/useCases/CreateUserUseCase";

export default class CreateUserController {
  constructor(private createUserService: ICreateUserUseCase) {}
  async start(req: Request, res: Response): Promise<Response> {
    await this.createUserService.execute({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      registerCode: req.body.registerCode,
      course: req.body.course,
      typeUser: req.body.typeUser,
    });
    return res.send("User created");
  }
}
