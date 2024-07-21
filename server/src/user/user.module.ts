import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // импортируем нашу таблицу User, чтобы она была доступна в модуле.
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // тобы он был виден за пределами этого модуля (использовальзуется в AuthService)
})
export class UserModule {}
