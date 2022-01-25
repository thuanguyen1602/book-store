import { IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class BookDto {
    @IsNotEmpty()
    title: string;

    @ArrayNotEmpty()
    authors: string[];
}