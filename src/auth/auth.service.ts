import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Author, AuthorDocument } from 'src/schemas/author.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    ) {}
    async login(loginDto: LoginDto) {
        const {email, password} = loginDto;

        let data = await this.authorModel.findOne({email}).select('+password');

        if (!data) {
            throw new BadRequestException('user_not_found');
        }

        const isMatch = this.comparePassword(password, data.password);
        
        if (!isMatch) {
            throw new BadRequestException('password_not_match');
        }
        const token = this.genderateToken(data);
        return {
            token: 'Bearer ' + token,
            user: {_id: data._id, email: data.email}
        };
    }

    public genderateToken(data: any) {
        return this.jwtService.sign({_id: data._id, userName: data.userName, permissions: data.permissions});
    }

    public comparePassword(newPw, currentPw) {
        return bcrypt.compareSync(newPw, currentPw);
    }
}
