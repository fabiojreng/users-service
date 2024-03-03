import { sign, verify } from "jsonwebtoken";

import User from "./User";

export default class TokenGenerator {
  static generate(payload: User) {
    const token = sign(
      {
        id: payload.id,
        name: payload.name.getValue(),
        email: payload.email.getValue(),
        registerCode: payload.registerCode,
        typeUser: payload.typeUser.getValue(),
        //iat: new Date().getTime(),
      },
      process.env.SECRET_KEY!,
      { expiresIn: "1d" }
    );
    return token;
  }

  static verify(token: string): any {
    try {
      const payload = verify(token, process.env.SECRET_KEY!);
      return payload;
    } catch (error) {
      return null;
    }
  }
}
