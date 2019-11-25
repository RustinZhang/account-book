import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { get } from 'lodash';
import { AccessForbidden } from '../common/exceptions/access-forbidden.exception';
import { ERROR_CODES } from '../consts';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOne(username);
      if (get(user, 'password') === pass) {
        const { password, ...result } = user;
        return {
          ...result,
          isNew: false,
        };
      }
      return null;
    } catch (e) {
      const user = await this.usersService.createOne(username, pass);
      const { password, ...result } = user;
      return {
        ...result,
        isNew: true,
      };
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
      isNew: user.isNew,
    };
  }
}
