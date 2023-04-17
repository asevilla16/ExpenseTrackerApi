import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('ExpenseService', () => {
  let mockExpenseModel = Model<Expense>;
  let service: ExpenseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: getModelToken('Expense'),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    mockExpenseModel = module.get<Model<Expense>>(getModelToken('Expense'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an expense doc', async () => {
    const expense = new Expense();
    const expenseId = '12345';
    const spy = jest
      .spyOn(mockExpenseModel, 'findById')
      .mockResolvedValue(expense as Expense);

    await mockExpenseModel.findById(expenseId);

    expect(spy).toBeCalled();
  });
});
