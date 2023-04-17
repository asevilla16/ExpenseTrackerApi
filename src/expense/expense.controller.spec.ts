import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

describe('PruebaController', () => {
  const mockExpenseService = {
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
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [ExpenseService],
    })
      .overrideProvider(ExpenseService)
      .useValue(mockExpenseService)
      .compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an expense', () => {
    let date = new Date();
    const dto = {
      name: 'Gasoline',
      categoryId: 'Transportation',
      amount: 1200,
      date: date,
    };

    expect(controller.create(dto)).toEqual({
      name: 'Gasoline',
      categoryId: 'Transportation',
      amount: 1200,
      date: date,
    });

    expect(mockExpenseService.create).toHaveBeenCalledWith(dto);
  });

  it('should update an expense', () => {
    const dto = {
      name: 'Gasoline',
      categoryId: 'Transportation',
      amount: 1200,
      date: new Date(),
    };

    expect(controller.update('1', dto)).toEqual({
      id: '1',
      ...dto,
    });

    expect(mockExpenseService.update).toHaveBeenCalled();
  });
});
