import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TABLE_NAMES } from '../consts';
import { Transaction } from '../transactions/transaction.entity';
import { User } from '../users/user.entity';

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

  @CreateDateColumn({
    name: 'category_create_time',
    type: 'datetime',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'category_update_time',
    type: 'datetime',
  })
  updateTime: Date;

  @OneToMany(type => Transaction, transaction => transaction.category)
  transactions: Transaction[];

  @ManyToOne(
    type => User,
    user => user.categories,
    {
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  user: User;
}
