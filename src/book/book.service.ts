import { Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from 'src/schemas/book.schema';
import { BookDto } from 'src/dto/book.dto';
import { Author, AuthorDocument } from 'src/schemas/author.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    ) {}

    async delete(id: string, authorId: string): Promise<Book> {
        const book = await this.bookModel.findOne({_id: id, authors: authorId});
        if (!book) {
            throw new BadRequestException('You can not delete this book');
        }
        return this.bookModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, bookDto: BookDto): Promise<Book> {
        return this.bookModel.findByIdAndUpdate(id, bookDto).exec();
    }

    async create(bookDto: BookDto): Promise<Book> {
        const authors = await this.authorModel.find({email: bookDto.authors});
        const authorIds = authors.map(a => a._id);
        const createdBook = new this.bookModel({title: bookDto.title, authors: authorIds});
        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }
}
