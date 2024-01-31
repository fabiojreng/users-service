import JWTGenerator from "../../domain/entities/JWTGenerator";

export default class VerifyToken {
  constructor(private jwtGenerate: JWTGenerator) {}
  async execute(token: string) {
    try {
      const auth = await this.jwtGenerate.verifyToken(token);
      if (auth) {
        return {
          message: "Authorized",
          data: {
            id: auth.id,
            name: auth.name.getValue(),
            email: auth.email.getValue(),
          },
          status: true,
        };
      }
      return {
        message: "Unauthorized",
        status: false,
      };
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Unexpected error");
    }
  }
}
