import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config'; // доп lib для работы с .env - файлами 

@Module({
  imports: [UserModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController], // типа роуты
  providers: [AppService], // логика
})
export class AppModule { }
