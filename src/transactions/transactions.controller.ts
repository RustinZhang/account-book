import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards, Request } from '@nestjs/common';
import { AUTH_TYPE, TRANSACTIONS_PATH } from '../consts';
import { AuthGuard } from '@nestjs/passport';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { get, toNumber } from 'lodash';
import { TransactionsService } from './transactions.service';
import { CreateOrAmendTransactionDto } from './dto/create-or-amend-transaction.dto';

@UseGuards(AuthGuard(AUTH_TYPE.JWT))
@Controller(TRANSACTIONS_PATH.ROOT)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getList(@Query() query: GetTransactionsDto) {
    const size = toNumber(get(query, 'size', 15));
    const page = toNumber(get(query, 'page', 1));
    return this.transactionsService.findList(size, page);
  }

  @Get(`:${TRANSACTIONS_PATH.CODE_PARAM}`)
  async getDetail(@Param(TRANSACTIONS_PATH.CODE_PARAM) code: string) {
    return this.transactionsService.findOne(toNumber(code));
  }

  @Post()
  async create(@Req() request: Request) {
    const data: CreateOrAmendTransactionDto = get(request, 'body');
    const userId: string = get(request, 'user.userId');
    return this.transactionsService.createOrAmend(data, userId);
  }

  @Put(`:${TRANSACTIONS_PATH.CODE_PARAM}`)
  async amend(@Req() request: Request, @Param(TRANSACTIONS_PATH.CODE_PARAM) code: string) {
    const data: CreateOrAmendTransactionDto = get(request, 'body');
    const userId: string = get(request, 'user.userId');
    return this.transactionsService.createOrAmend(data, userId, toNumber(code));
  }

  @Delete(`:${TRANSACTIONS_PATH.CODE_PARAM}`)
  async remove(@Param(TRANSACTIONS_PATH.CODE_PARAM) code: string) {
    return this.transactionsService.remove(toNumber(code));
  }
}
