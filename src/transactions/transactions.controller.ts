import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TRANSACTIONS_PATH } from '../consts';

@Controller(TRANSACTIONS_PATH.ROOT)
export class TransactionsController {
  @Get()
  getList() {
    // todo 获取账目列表
  }

  @Get(TRANSACTIONS_PATH.CODE_PARAM)
  getDetail() {
    // todo 获取账目详情
  }

  @Post()
  create() {
    // todo 创建账目
  }

  @Put(TRANSACTIONS_PATH.CODE_PARAM)
  amend() {
    // todo 修改更新账目记录
  }

  @Delete(TRANSACTIONS_PATH.CODE_PARAM)
  remove() {
    // todo 删除账目记录
  }
}
