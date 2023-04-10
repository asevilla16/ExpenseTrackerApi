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
      return expense.save();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.expenseModel.find();
  }

  async findOne(id: string) {
    let expense = await this.expenseModel.findById(id);

    if (!expense) {
      throw new NotFoundException(`Expense with id ${id} was not found`);
    }

    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
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
