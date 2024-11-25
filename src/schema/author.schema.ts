import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Book } from './book.schema';

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);