import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CATEGORIES_PATH } from '../consts';

@Controller(CATEGORIES_PATH.ROOT)
export class CategoriesController {
  @Get()
  getList() {
    // todo 获取列表
  }

  @Post()
  create() {
    // todo 新建
  }

  @Delete(CATEGORIES_PATH.CODE_PARAM)
  remove() {
    // todo 删除
  }

  @Put(CATEGORIES_PATH.CODE_PARAM)
  amend() {
    // todo 修改
  }
}
