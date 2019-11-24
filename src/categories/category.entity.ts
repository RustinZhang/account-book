import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_NAMES } from '../consts';
import { Transaction } from '../transactions/transaction.entity';

@Entity(TABLE_NAMES.CATEGORIES)
export class Category {
  @PrimaryGeneratedColumn({
    name: 'category_code',
  })
  categoryCode: string;

  @Column({
    name: 'category_name',
    type: 'varchar',
    length: 6,
  })
  categoryName: string;

  @Column({
    name: 'is_expense',
    type: 'bool',
  })
  isExpense: boolean;

  @OneToMany(type => Transaction, transaction => transaction.category)
  transactions: Transaction[];
}
