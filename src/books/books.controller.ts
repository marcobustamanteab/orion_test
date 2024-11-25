import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.booksService.findBookById(id);
    if (!task) throw new NotFoundException('Book not found');
    return task;
  }

  @Get('pages-per-chapter')
  async getPagesPerChapter() {
    return this.booksService.getPagesPerChapter();
  }
}
