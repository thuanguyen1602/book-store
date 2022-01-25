import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author, AuthorDocument } from './schemas/author.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
) {}
  async onModuleInit() {
    const author = await this.authorModel.findOne({email: 'test@gmail.com'});
    if (!author) {
      const data: CreateAuthorDto = {email: 'test@gmail.com', password: '123123', name: 'test'};
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      const objData = new this.authorModel(data);
      const result = await objData.save();
    }

    const admin = await this.authorModel.findOne({email: 'admin@gmail.com'});
    if (!admin) {
      const data: CreateAuthorDto = {email: 'admin@gmail.com', password: '123123', name: 'admin'};
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
      const objData = new this.authorModel(data);
      const result = await objData.save();
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}
