import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TABLE_NAMES } from '../consts';
import { Transaction } from '../transactions/transaction.entity';

@Entity(TABLE_NAMES.USERS)
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 8,
  })
  userName: string;

  @Column({
    name: 'user_password',
    type: 'varchar',
    length: 50,
  })
  userPassword: string;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}
