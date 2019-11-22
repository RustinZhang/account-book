import { Controller, Post } from '@nestjs/common';
import { USERS_PATH } from '../consts';

@Controller(USERS_PATH.ROOT)
export class UsersController {
  @Post(USERS_PATH.ACCESS)
  systemAccess() {
    // todo 注册或登录
  }
}
