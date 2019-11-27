import { Injectable } from '@nestjs/common';
import { CreateOrAmendCategoryDto } from './dto/create-or-amend-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Transaction } from '../transactions/transaction.entity';
import { AccessForbidden } from '../common/exceptions/access-forbidden.exception';
import { QueryDto } from './dto/query.dto';
import { isEmpty } from 'lodash';
import { User } from 'src/users/user.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async getList(data: QueryDto) {
        const params: any = {};
        if (!isEmpty(data)) {
            const keyMap = {
                name: 'categoryName',
                code: 'categoryCode',
                type: 'isExpense',
            };
            for (const key in data) {
                if (data.hasOwnProperty(key) && !!data[key]) {
                    params[keyMap[key]] = key === 'type' ? data[key] === 'expense' : data[key];
                }
            }
        }
        const [categories, count] = await this.categoriesRepository.findAndCount(params);
        return {
            list: categories,
            total: count,
        };
    }

    async createOrAmend(data: CreateOrAmendCategoryDto, userId: string, categoryCode?: number) {
        const category = !!categoryCode ? await this.categoriesRepository.findOneOrFail(categoryCode) : new Category();
        category.categoryName = data.categoryName;
        category.isExpense = data.isExpense;
        category.user = await this.userRepository.findOneOrFail(userId);
        if (!!categoryCode) {
            category.categoryCode = categoryCode;
        }
        return this.categoriesRepository.save(category);
    }

    async delete(categoryCode: number) {
        await this.categoriesRepository.findOneOrFail(categoryCode);
        await this.categoriesRepository.delete(categoryCode);
        return {};
    }

    findCategory(params: object) {
        return this.categoriesRepository.findOne(params);
    }
}
