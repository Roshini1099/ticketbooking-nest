import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import {MongooseModule} from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin-roshini:roshini1999@cluster0.oz4rg.mongodb.net/ticketnest?retryWrites=true&w=majority'),TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
//'mongodb+srv://admin-roshini:roshini1999@cluster0.oz4rg.mongodb.net/ticketnest?retryWrites=true&w=majority'