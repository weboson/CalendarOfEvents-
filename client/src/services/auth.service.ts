//! Обработчики запросов (post, get, patch etc. от axios) для auth
import { instance } from '../api/axios.api'; // базовые настройки запроса
import { IResponseUserData, IUser, IUserData } from '../types/types';
// Видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1376 
export const AuthService = {
    // метод для регистрации
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        // post передает IUserData, a возвращется откликом с сервера = data: IResponseUserData (server\src\user\user.service.ts)
        const { data } = await instance.post<IResponseUserData>('user', userData); // 'http://localhost:3000/api/user'
        return data
    },

    // войти уже существуещему user (server\src\auth\auth.service.ts)
    async login(userData: IUserData): Promise<IUser | undefined> {  // id, email, token
        // response: id, email и token (server\src\auth\auth.service.ts)
        const { data } = await instance.post<IUser>('auth/login', userData); 
        return data
     },
    async getMe() {  },
}