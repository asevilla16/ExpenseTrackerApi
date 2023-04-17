import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Expense {
  @Prop({
    index: true,
  })
  name: string;

  @Prop({
    index: true,
  })
  categoryId: string;

  @Prop()
  amount: number;

  @Prop()
  date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
