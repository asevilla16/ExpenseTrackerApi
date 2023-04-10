import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  name: string;

  @IsString()
  expenseTypeId: string;

  @IsString()
  categoryId: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsDateString()
  date: Date;
}
