import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsInt()
  @Min(1)
  amount: number;

  date: Date;
}
