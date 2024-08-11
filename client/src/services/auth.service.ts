// Обработчики запросов (post, get, patch etc. от axios) для auth
import { instance } from '../api/axios.api'; // базовые настройки запроса
import { IResponseUserData, IUserData } from '../types/types';
// Видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1376 
export const AuthService = {
    // метод для регистрации
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        // post передает IUserData, a возвращется откликом с сервера = data: IResponseUserData
        const { data } = await instance.post<IResponseUserData>('user', userData); // 'http://localhost:3000/api/user'
        return data
    },

    async login() { },
    async getMe() { },
}