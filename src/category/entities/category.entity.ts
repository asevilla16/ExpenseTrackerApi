import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({
    unique: true,
    index: true,
  })
  description: string;

  @Prop({
    index: true,
  })
  operationType: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
