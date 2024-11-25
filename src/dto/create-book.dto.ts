import { IsString, IsNumber, IsArray, Min, ArrayNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(1)
  chapters: number;

  @IsNumber()
  @Min(1)
  pages: number;

  @IsArray()
  @ArrayNotEmpty()
  authorIds: string[];
}