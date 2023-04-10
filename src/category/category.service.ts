import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      return category;
    } catch (error) {
      this.handleErrors(error);
    }
  }

  findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    let category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`Expense type with id ${id} was not found`);
    }

    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
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
