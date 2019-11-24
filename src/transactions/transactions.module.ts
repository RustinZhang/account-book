import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [TransactionsController],
})
export class TransactionsModule {}
