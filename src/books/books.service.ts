import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from '../schema/book.schema';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BooksService {

  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel(createBookDto);
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('authors').exec();
  }

  async findBookById(id: string){
    return this.bookModel.findById(id).exec();
  }

  async getPagesPerChapter(): Promise<any[]> {
    const books = await this.bookModel.find().exec();
    return books.map(book => ({
      id: book._id,
      averagePages: Number((book.pages / book.chapters).toFixed(2))
    }));
  }
}