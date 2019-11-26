import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateOrAmendTransactionDto } from './dto/create-or-amend-transaction.dto';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findList(size, page) {
    const [transactions, count] = await this.transactionRepository.findAndCount({
      skip: (page * size),
      take: size,
      order: {
        date: 'DESC',
      },
    });
    return {
      list: transactions,
      pagination: {
        size,
        page,
        total: count,
      },
      order: 'DESC',
      orderBy: 'date',
    };
  }

  async findOne(transactionCode: number) {
    return this.transactionRepository.findOneOrFail(transactionCode);
  }

  async createOrAmend(data: CreateOrAmendTransactionDto, userId: string, transactionCode?: number) {
    const transaction = transactionCode ? await this.transactionRepository.findOneOrFail(transactionCode) : new Transaction();
    transaction.amount = data.amount;
    transaction.user = await this.findUser(userId);
    transaction.category = await this.findCategory(data.categoryCode);
    transaction.date = data.date;
    transaction.remark = data.remark;
    return this.transactionRepository.save(transaction);
  }

  async remove(transactionCode: number) {
    return this.transactionRepository.delete(transactionCode);
  }

  async findUser(userId: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { userId },
    });
  }

  async findCategory(categoryCode: number): Promise<Category> {
    return this.categoryRepository.findOneOrFail({
      where: { categoryCode },
    });
  }
}
