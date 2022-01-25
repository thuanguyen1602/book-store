import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Author } from './author.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({required: true})
  title: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }] })
  authors: Author[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
