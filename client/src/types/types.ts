// видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1691
export interface IUserData { // for client\src\serviсes\auth.service.ts
    email: string
    password: string
}

export interface IResponseUse {
    id: string
    email: string
    // password: string // убрал и отклика в server\src\user\user.service.ts
    createdAtUser: string
    updateAtUser: string
}

// ожидается отклик от сервера при регистрации
export interface IResponseUserData {
    token: string
    userData: IResponseUse
}

// тип ответа при "войти" существующего user (client\src\services\auth.service.ts)
// response: id, email и token (server\src\auth\auth.service.ts)
export interface IResponseLoginData {
    id: string
    email: string
    token: string 
}