import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { BookService } from './book.service';
import { Author, AuthorSchema } from 'src/schemas/author.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema },
            { name: Author.name, schema: AuthorSchema },
        ])
    ],
    providers: [BookService],
    controllers: [BookController]
})
export class BookModule {}
