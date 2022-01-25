import {Controller, Post, Body, Res, Get, UseGuards, Put, Param, Delete, Headers} from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookDto } from 'src/dto/book.dto';
import {decode} from 'jsonwebtoken';
import { AuthorDocument } from 'src/schemas/author.schema';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {

  constructor(private bookService: BookService) { }

  @Get()
  list() {
    return this.bookService.findAll()
  }

  @Post()
  create(@Body() data: BookDto) {
    return this.bookService.create(data);
  }

  @Put(':id')
  update(@Body() data: BookDto, @Param('id') id: string) {
    return this.bookService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Headers('authorization') authorization,) {
    const authInfo: any = this.getAuthInfo(authorization);
    return this.bookService.delete(id, authInfo._id);
  }

  getAuthInfo(authString: string) {
    const secret: any = 'api@bookStore';
    const parted = authString.split(' ');
    const token = parted[1];
    const decoded = decode(token, secret);
    return decoded;
  }
}
