import { Injectable } from '@nestjs/common';
import { CreateOrAmendCategoryDto } from './dto/create-or-amend-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Transaction } from '../transactions/transaction.entity';
import { QueryDto } from './dto/query.dto';
import { isEmpty, map } from 'lodash';
import { User } from '../users/user.entity';
import { ParamsError } from '../common/exceptions/params-error.exception';
import { ERROR_CODES } from '../consts';
import { CATEGORIES_TYPE } from './dto/query.dto';

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
        const params: any = {
            order: {
                updateTime: 'DESC',
            },
            where: {},
        };
        if (!isEmpty(data)) {
            const keyMap = {
                name: 'categoryName',
                code: 'categoryCode',
                type: 'isExpense',
            };
            for (const key in data) {
                if (data.hasOwnProperty(key) && !!data[key]) {
                    params.where[keyMap[key]] = key === 'type' ? data[key] === CATEGORIES_TYPE.EXPENSE : data[key];
                }
            }
        }
        const [categories, count] = await this.categoriesRepository.findAndCount(params);
        return {
            list: map(categories, category => {
                const { categoryCode, categoryName, isExpense } = category;
                return {
                    categoryCode,
                    categoryName,
                    isExpense,
                };
            }),
            total: count,
        };
    }

    async createOrAmend(data: CreateOrAmendCategoryDto, userId: string, categoryCode?: number) {
        const category = !!categoryCode ? await this.categoriesRepository.findOneOrFail(categoryCode) : new Category();

        const { categoryName, isExpense } = data;
        const user = await this.userRepository.findOneOrFail(userId);

        // 当前创建/修改分类是否已经存在
        const findCategory = await this.categoriesRepository.findOne({ where: { categoryName, isExpense, user } });
        if (!!findCategory) {
            throw new ParamsError({
                errorCode: ERROR_CODES.CATEGORIES_TYPE_HAVE_SURVICE,
                message: '当前分类已存在',
            });
        }

        category.categoryName = categoryName;
        category.isExpense = isExpense;
        category.user = user;
        if (!!categoryCode) {
            category.categoryCode = categoryCode;
        }
        await this.categoriesRepository.save(category);
        return {};
    }

    async delete(categoryCode: number) {
        const category: Category = await this.categoriesRepository.findOneOrFail(categoryCode);
        // const transactions: Transaction[] = await this.transactionRepository.find({ where: { category } });
        // if (transactions && transactions.length > 0) {
        //     await this.transactionRepository.remove(transactions);
        // }
        await this.categoriesRepository.delete(categoryCode);
        return {};
    }
}
