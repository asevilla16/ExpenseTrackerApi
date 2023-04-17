import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('PruebaController', () => {
  const mockCategoryService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };
  let controller: CategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', () => {
    const dto = {
      description: 'Entertainment',
      operationType: 'expense',
    };
    expect(controller.create(dto)).toEqual({
      description: 'Entertainment',
      operationType: 'expense',
    });

    expect(mockCategoryService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a category', () => {
    const dto = { description: 'Entertainment', operationType: 'expense' };

    expect(controller.update('1', dto)).toEqual({
      id: '1',
      ...dto,
    });

    expect(mockCategoryService.update).toHaveBeenCalled();
  });
});
