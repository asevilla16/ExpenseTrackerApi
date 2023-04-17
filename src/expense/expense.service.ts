import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private readonly expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const expense = new this.expenseModel(createExpenseDto);
      expense.date = new Date();
      return expense.save();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.expenseModel.find();
  }

  findIncomesGroupedByCategory() {
    return this.expenseModel.aggregate([
      { $group: { _id: '$categoryId', total: { $sum: '$amount' } } },
    ]);
  }

  async findOne(id: string) {
    let expense = await this.expenseModel.findById(id);

    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} was not found`);
    }

    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);

    try {
      await expense.updateOne(updateExpenseDto, { new: true });
      return { ...expense.toJSON(), ...updateExpenseDto };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    const result = await this.expenseModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new BadRequestException(`Expense with id "${id}" not found`);
    }

    return result;
  }

  private handleErrors(error) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Registry exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create registry - Check server logs`,
    );
  }
}
