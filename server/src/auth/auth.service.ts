import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2' // для расшифровки пароля (ведь мы его зашифровали в user.service)

@Injectable()
export class AuthService {
  // https://docs.nestjs.com/recipes/passport 
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    // verify - расшифровывет и сравнивает на схожесть проверяемого пароля с имеющимся в БД
    const passwordIsMatch = await argon2.verify(user.password, password) 
    
    if (user && passwordIsMatch) {
      return user;
    }
    throw new BadRequestException('Имя или пароль введены не верно');
  }
  
}
