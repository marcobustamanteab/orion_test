import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  chapters: number;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Author' }] })
  authors: Types.ObjectId[];
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);