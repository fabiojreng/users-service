import jwt from "jsonwebtoken";
import User from "./User";

export default class JWTGenerator {
  generateToken(payload: User): any {
    try {
      const token = jwt.sign(
        { id: payload.id, name: payload.name, email: payload.email },
        process.env.SECRET_KEY!,
        { expiresIn: "1d" }
      );
      if (!token) throw new Error("Token not generete!");
      return token;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!);
      if (!decoded) throw new Error("Token is not valid!");
      return !!decoded;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
