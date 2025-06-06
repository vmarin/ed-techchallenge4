import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthUsersService } from 'src/users/services/auth-users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly authUsersService: AuthUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authUsersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
