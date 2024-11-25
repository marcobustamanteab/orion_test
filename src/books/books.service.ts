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

  // en esta parte creé varias validaciones apara ir haciendo debugging con los datos, que no podía relacionar...
  async create(createBookDto: CreateBookDto): Promise<BookDocument> {

    try {
      const authorObjectIds = createBookDto.authorIds.map(id => new Types.ObjectId(id));
      const authors = await this.authorModel.find({
        _id: { $in: authorObjectIds }
      });

      if (authors.length !== authorObjectIds.length) {
        throw new NotFoundException('Uno o más autores no fueron encontrados');
      }

      const createdBook = new this.bookModel({
        title: createBookDto.title,
        chapters: createBookDto.chapters,
        pages: createBookDto.pages,
        authors: authorObjectIds
      });

      const savedBook = await createdBook.save();

      const updatePromises = authors.map(author => 
        this.authorModel.findByIdAndUpdate(
          author._id,
          { $addToSet: { books: savedBook._id } },
          { new: true }
        )
      );

      await Promise.all(updatePromises);

      return this.bookModel
        .findById(savedBook._id)
        .populate('authors')
        .exec();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  async findAll(): Promise<BookDocument[]> {
    return this.bookModel
      .find()
      //aquí agregue la parte en que me devuelve bien la parte de los autores, recurrí al populate pasandole el objeto de authors. 
      .populate('authors')
      .exec();
  }
  
  //Esta fue la parte que implementé para poder hacer un cleanData y poder mostrar bien los datos del otro lado, en donde fue mi mayor stopper y tuve que recurrir a gpt para poder soucionar esta parte (sinceridad ante todo).
  async fixRelationships(): Promise<void> {
    const books = await this.bookModel.find().exec();
    const authors = await this.authorModel.find().exec();

    await this.bookModel.updateMany({}, { $set: { authors: [] } });
    await this.authorModel.updateMany({}, { $set: { books: [] } });

    for (const book of books) {
      if (book.authors && book.authors.length > 0) {
        await this.authorModel.updateMany(
          { _id: { $in: book.authors } },
          { $addToSet: { books: book._id } }
        );
      }
    }
  }
}