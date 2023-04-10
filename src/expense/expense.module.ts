import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './entities/expense.entity';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
})
export class ExpenseModule {}
