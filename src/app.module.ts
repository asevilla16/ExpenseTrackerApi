import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';
import { IncomeModule } from './income/income.module';
import { EnvConfiguration } from 'config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    MongooseModule.forRoot(
      'mongodb+srv://expensesdb_user:3vrQHzXcF97xJffa@cluster0.pnuunpn.mongodb.net/expense-tracker',
    ),
    CategoryModule,
    ExpenseModule,
    IncomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
