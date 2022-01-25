import {Controller, Post, Body, Res} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from './auth.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { CreateAuthorDto } from '../dto/create-author.dto';
import * as bcrypt from 'bcrypt';
import { Author, AuthorDocument } from 'src/schemas/author.schema';

@Controller('auth')
export class AuthController {

  constructor(
      private authService: AuthService,
      @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    res.json(result);
  }
  @Post('register')
  async register(@Body() data: CreateAuthorDto, @Res() res: Response) {
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const objData = new this.authorModel(data);
    const result = await objData.save();
    res.json({status: 'success'});
  }
}
