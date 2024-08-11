// видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1691
export interface IUserData { // for client\src\serviсes\auth.service.ts
    email: string
    password: string
}

// ожидается отклик от сервера при регистрации
export interface IResponseUserData {
    email: string | undefined
    password: string | undefined
    createdAtUser: string | undefined
    updateAtUser: string | undefined
    __v?: number | undefined // хз
    _id?: string | undefined
    message: string | undefined
}