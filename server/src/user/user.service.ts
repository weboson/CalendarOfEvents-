import { JwtService } from '@nestjs/jwt';
//! логика поиска и сохранения нового пользователя в БД
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2"; // хэширование пароля (шифрование)

@Injectable()
export class UserService {
  // заинжектим (внедрим) нашу таблицу
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly JwtService: JwtService
  ) { }


  async create(createUserDto: CreateUserDto) {
    // существует ли уже такой user - проверка по email? https://youtu.be/PWWz47GtGKo?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1138 
    // findOne (от TypeORM wrapper Repository<сущность>) == это вместо SQL-запросов: WHERE ..., SELECT table ...etc
    const existUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    })
    if (existUser) throw new BadRequestException('Такой email уже существует')
    //! если такого user нет в БД, то сохраняем его в БД, как новый
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password) // зашифровали пароль
    })

    // создадим при регистрации jwt-токен на основе поля email
    const token = this.JwtService.sign({email: createUserDto.email })

    return { user, token }; 
  }

  async findOne(email: string) {
    // findOne (от TypeORM wrapper Repository<сущность>)
    return await this.userRepository.findOne({ where: { email, } }); // найти по email { email: email } - сокращенно {email} 
  }
}
