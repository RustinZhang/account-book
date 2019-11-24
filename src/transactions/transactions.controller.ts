import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AUTH_TYPE, TRANSACTIONS_PATH } from '../consts';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard(AUTH_TYPE.JWT))
@Controller(TRANSACTIONS_PATH.ROOT)
export class TransactionsController {
  @Get()
  getList() {
    return '获取账目列表接口';
  }

  @Get(TRANSACTIONS_PATH.CODE_PARAM)
  getDetail() {
    return '获取账目详情';
  }

  @Post()
  create() {
    return '创建账目';
  }

  @Put(TRANSACTIONS_PATH.CODE_PARAM)
  amend() {
    return '修改更新账目记录';
  }

  @Delete(TRANSACTIONS_PATH.CODE_PARAM)
  remove() {
    return '删除账目记录';
  }
}
