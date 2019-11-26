import { Controller, Delete, Get, Post, Put, UseGuards, Response, Body, ValidationPipe } from '@nestjs/common';
import { AUTH_TYPE, CATEGORIES_PATH } from '../consts';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrAmendCategoryDto } from './dto/create-or-amend-category.dto';

@UseGuards(AuthGuard(AUTH_TYPE.JWT))
@Controller(CATEGORIES_PATH.ROOT)
export class CategoriesController {
  @Get()
  query() {
    return '获取分类列表';
  }

  @Post()
  create(@Body() createOrAmendCategoryDto: CreateOrAmendCategoryDto) {
    console.log(1111);
    return '新建分类';
  }

  @Delete(CATEGORIES_PATH.CODE_PARAM)
  remove() {
    return '删除分类';
  }

  @Put(CATEGORIES_PATH.CODE_PARAM)
  amend() {
    return '修改分类';
  }
}
