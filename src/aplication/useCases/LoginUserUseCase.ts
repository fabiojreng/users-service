import bcrypt from "bcrypt";
import IUserRepository from "../repository/UserRepository";
import JWTGenerator from "../../domain/entities/JWTGenerator";

export default class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private jwtGeneretor: JWTGenerator
  ) {}
  async execute(params: Input): Promise<string> {
    try {
      const user = await this.userRepository.findByEmail(params.email);
      if (!user) throw new Error("User not found");

      const hash = await bcrypt.compare(
        params.password,
        user.password.getValue()
      );
      if (!hash) throw new Error("User or pass is invalid");
      const token = this.jwtGeneretor.generateToken(user);
      return token;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}

type Input = {
  email: string;
  password: string;
};
