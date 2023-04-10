import { Module } from '@nestjs/common';
import { ExpenseTypeModule } from './expense-type/expense-type.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/expense-tracker'),
    ExpenseTypeModule,
    CategoryModule,
    ExpenseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
