import { Module } from '@nestjs/common';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeController } from './expense-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseType, ExpenseTypeSchema } from './entities/expense-type.entity';

@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService],
  imports: [
    MongooseModule.forFeature([
      { name: ExpenseType.name, schema: ExpenseTypeSchema },
    ]),
  ],
})
export class ExpenseTypeModule {}
