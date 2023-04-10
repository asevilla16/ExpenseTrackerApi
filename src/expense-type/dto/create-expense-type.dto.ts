import { IsString } from 'class-validator';

export class CreateExpenseTypeDto {
  @IsString()
  description: string;
}
