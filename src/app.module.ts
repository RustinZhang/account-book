import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UserModule, AuthModule, TransactionModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
