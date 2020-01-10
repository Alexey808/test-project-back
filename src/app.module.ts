import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './entity/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseUri, getMongooseOption } from './mongo.config';

@Module({
  imports: [
    MongooseModule.forRoot(
      getMongooseUri(),
      getMongooseOption(),
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
