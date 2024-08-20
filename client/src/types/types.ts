//! Авторизация  
// видео помощник: https://youtu.be/-zQrK0mfZFY?list=PLkUJHNMBzmtQj5qvTCqn0uMXFDG4ENiwf&t=1691
// тип ответа при "войти" существующего user (client\src\services\auth.service.ts)
// response: id, email и token (server\src\auth\auth.service.ts)
export interface IUser {
    id: number
    email: string
    token: string
}


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


//! MealSchedule (график питания)
//Exmle: {"weekday":[8,22],"weekend":[9,22]}  
// ввод в форме
export interface IMealSchedule {
    weekday: string
    weekend: string
}

// ответ с сервера
export interface IMealscheduleRepository {
    id: number
    weekday: string
    weekend: string
    user: { id: number }
    relations: { user: boolean }
    createDateMeal: string
    updateDateMeal: string
}

