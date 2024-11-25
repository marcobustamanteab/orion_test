import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [

    // en este punto, tengo mis credenciales para acceder a mi cluster de mongo atlas y a mi db. Por ahora, creo que debiese crear un archivo .env para que no se 
    // visualicen las credenciales, claramente, pero a modo de testing y para enviar la prueba, los dejaré seteados aqui. Eventualmente, habrá que cambiarlos para 
    // testear el código.
    MongooseModule.forRoot('mongodb+srv://marcoabustam:2UDJc61TIPSGeOEd@cluster0.u0e9f.mongodb.net/oriondb_test?retryWrites=true&w=majority&appName=Cluster0'),
    BooksModule,
    AuthorsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
