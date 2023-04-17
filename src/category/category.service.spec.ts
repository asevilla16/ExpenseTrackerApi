import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

describe('CategoryService', () => {
  let service: CategoryService;

  let mockCategoryModel = Model<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getModelToken('Category'),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    mockCategoryModel = module.get<Model<Category>>(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a category doc', async () => {
    const category = new Category();
    const categoryId = '12345';
    const spy = jest
      .spyOn(mockCategoryModel, 'findById')
      .mockResolvedValue(category as Category);

    await mockCategoryModel.findById(categoryId);

    expect(spy).toBeCalled();
  });
});
