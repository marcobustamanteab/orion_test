import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Author } from './author.schema';

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  chapters: number;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Author' }] })
  authors: Author[] | MongooseSchema.Types.ObjectId[];
}

export type BookDocument = Book & Document;
export const BookSchema = SchemaFactory.createForClass(Book);