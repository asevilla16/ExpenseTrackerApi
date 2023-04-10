import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExpenseType {
  @Prop({
    unique: true,
    index: true,
  })
  description: string;
}

export const ExpenseTypeSchema = SchemaFactory.createForClass(ExpenseType);
