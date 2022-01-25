import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
    @IsNotEmpty()
    name: string;
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}