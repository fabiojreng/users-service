import { Request, Response } from "express";
import ICreateUserUseCase from "../domain/useCases/CreateUserUseCase";

export default class CreateUserController {
  constructor(private createUserService: ICreateUserUseCase) {}
  async start(req: Request, res: Response): Promise<Response> {
    try {
      await this.createUserService.execute({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        registerCode: req.body.registerCode,
        course: req.body.course,
        typeUser: req.body.typeUser,
      });
      return res.status(201).json({ message: "User created" });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ messege: error.message });
      return res.status(400).json({ messege: "Unexpected error" });
    }
  }
}
