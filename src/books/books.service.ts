import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book, BookDocument } from '../schema/book.schema';
import { Author, AuthorDocument } from '../schema/author.schema';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookDocument> {
    const authorObjectIds = createBookDto.authorIds.map(id => new Types.ObjectId(id));

    const authors = await this.authorModel.find({
      _id: { $in: authorObjectIds }
    }).exec();

    if (authors.length !== createBookDto.authorIds.length) {
      throw new NotFoundException('Uno o más autores no fueron encontrados');
    }

    const createdBook = new this.bookModel({
      title: createBookDto.title,
      chapters: createBookDto.chapters,
      pages: createBookDto.pages,
      authors: authorObjectIds
    });

    const savedBook = await createdBook.save();

    await Promise.all(
      authors.map(async (author) => {
        return this.authorModel.findByIdAndUpdate(
          author._id,
          {
            $push: { books: savedBook._id }
          },
          { new: true }
        );
      })
    );

    return this.bookModel
      .findById(savedBook._id)
      .populate('authors')
      .exec();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel
      .find()
      .populate('authors', 'name')
      .exec();
  }

  async getPagesPerChapter(): Promise<any[]> {
    const books = await this.bookModel.find().exec();
    return books.map(book => ({
      id: book._id,
      title: book.title,
      averagePages: Number((book.pages / book.chapters).toFixed(2))
    }));
  }
}
