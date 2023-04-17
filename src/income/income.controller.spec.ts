import { Test, TestingModule } from '@nestjs/testing';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';

describe('IncomeController', () => {
  const mockIncomeService = {};
  let controller: IncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeController],
      providers: [IncomeService],
    })
      .overrideProvider(IncomeService)
      .useValue(mockIncomeService)
      .compile();

    controller = module.get<IncomeController>(IncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
