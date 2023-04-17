import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Income {
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

export const IncomeSchema = SchemaFactory.createForClass(Income);
