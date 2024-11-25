import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://marcoabustam:2UDJc61TIPSGeOEd@cluster0.u0e9f.mongodb.net/oriondb_test?retryWrites=true&w=majority&appName=Cluster0'),
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
