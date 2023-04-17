import { Test, TestingModule } from '@nestjs/testing';
import { IncomeService } from './income.service';
import { Model } from 'mongoose';
import { Income } from './entities/income.entity';

describe('IncomeService', () => {
  const mockIncomeService = {};

  let service: IncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomeService],
    })
      .overrideProvider(IncomeService)
      .useValue(mockIncomeService)
      .compile();

    service = module.get<IncomeService>(IncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
