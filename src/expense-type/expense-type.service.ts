import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseTypeDto } from './dto/create-expense-type.dto';
import { UpdateExpenseTypeDto } from './dto/update-expense-type.dto';
import { ExpenseType } from './entities/expense-type.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseTypeService {
  constructor(
    @InjectModel(ExpenseType.name)
    private readonly expenseTypeModel: Model<ExpenseType>,
  ) {}

  async create(createExpenseTypeDto: CreateExpenseTypeDto) {
    try {
      const expenseType = await this.expenseTypeModel.create(
        createExpenseTypeDto,
      );
      return expenseType;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.expenseTypeModel.find();
  }

  async findOne(id: string) {
    let expenseType = await this.expenseTypeModel.findById(id);

    if (!expenseType) {
      throw new NotFoundException(`Expense type with id ${id} was not found`);
    }

    return expenseType;
  }

  update(id: number, updateExpenseTypeDto: UpdateExpenseTypeDto) {
    return `This action updates a #${id} expenseType`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseType`;
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
