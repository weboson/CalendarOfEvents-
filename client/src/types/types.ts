// видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1691
export interface IUserData { // for client\src\serviсes\auth.service.ts
    email: string
    password: string
}

export interface IResponseUse {
    id: string
    email: string
    password: string
    createdAtUser: string
    updateAtUser: string
}

// ожидается отклик от сервера при регистрации
export interface IResponseUserData {
    token: string
    user: IResponseUse
}