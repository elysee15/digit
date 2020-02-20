import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  // Retrouve un user a partir du token dans authorization et le renvoie
  async validateUser(token: string): Promise<any> {
    return null;
  }
}
