import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './schemas/author.schema';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    AuthModule,
    BookModule,
    MongooseModule.forRoot('mongodb://localhost/bookStore'),
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
