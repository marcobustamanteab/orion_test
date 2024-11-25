import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from '../dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return this.booksService.findAll();
  }


  //me vi en la obligación de poder implementar este patch para poder limpiar las relaciones (ya que no se estaban asociando de manera correcta), puedo decir que fue mi mayor stopper en la prueba técnica. Dios, que me costo sacar esto. jaja (Aquí debo mencionarlo, me apoye con GPT...)
  @Patch('fix-relationships')
  async fixRelationships() {
    await this.booksService.fixRelationships();
    return { message: 'Relationships fixed successfully' };
  }
}