import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Author } from './author.schema';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  chapters: number;

  @Prop({ required: true })
  pages: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Author' }] })
  authors: Author[];
}

export const BookSchema = SchemaFactory.createForClass(Book);