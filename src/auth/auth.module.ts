import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Author, AuthorSchema } from 'src/schemas/author.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'api@bookStore',
            signOptions: {
                expiresIn: '2 days',
            },
        }),
        MongooseModule.forFeature([
            { name: Author.name, schema: AuthorSchema },
        ])
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
