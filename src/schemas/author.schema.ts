import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Book } from './book.schema';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({required: true})
  name: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({select: false, required: true})
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
  books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
