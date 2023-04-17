import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './entities/income.entity';
import { Model } from 'mongoose';

@Injectable()
export class IncomeService {
  constructor(
    @InjectModel(Income.name)
    private readonly incomeModel: Model<Income>,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    try {
      const income = new this.incomeModel(createIncomeDto);
      income.date = new Date();
      return income.save();
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.incomeModel.find();
  }

  findIncomesGroupedByCategory() {
    return this.incomeModel.aggregate([
      { $group: { _id: '$categoryId', total: { $sum: '$amount' } } },
    ]);
  }

  async findOne(id: string) {
    let income = await this.incomeModel.findById(id);

    if (!income) {
      throw new NotFoundException(`Income with id ${id} was not found`);
    }

    return income;
  }

  async update(id: string, updateIncomeDto: UpdateIncomeDto) {
    const income = await this.findOne(id);

    try {
      await income.updateOne(updateIncomeDto, { new: true });
      return { ...income.toJSON(), ...updateIncomeDto };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  async remove(id: string) {
    const result = await this.incomeModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new BadRequestException(`Income with id "${id}" not found`);
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
