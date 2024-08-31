import { instance } from './../api/axios.api';
//! запросы на сервер
import { getTokenFromLocalStorage } from "../helpers/localStorage.helper";
import { IRecipe, IRecipeRepository } from "../types/types";

export const RecipeService = {

    // post (create)
    async create(recipe: IRecipe): Promise<IRecipeRepository | undefined> {

        const { data } = await instance.post<IRecipeRepository>('recipes', recipe, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/recipes
        return data
    },

    // GetAll
    async getAll() {
        const { data } = await instance.get('recipes', {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        }); // http://localhost:3000/api/recipes
        return data;
    },

    // // получить (по id) созданный график (относящиеся к текущему авторизированному user)
    // async getOne(id: string): Promise<IMealscheduleRepository | undefined> { // используется в client\src\App.tsx
    //     const { data } = await instance.get<IMealscheduleRepository>(`mealschedules/mealschedule/${+id}`, {
    //         headers: {
    //             Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
    //         }
    //     })
    //     if (data) return data
    // },

    //удалить по id 
    async removeOne(id: number): Promise<IRecipeRepository | undefined> {
        const { data } = await instance.delete<IRecipeRepository>(`recipes/recipe/${+id}`, {
            headers: {
                Authorization: `Bearer ` + getTokenFromLocalStorage() || '' // при любом (кроме регистрации) обращении к server достаем из отправляем токен (так требует @UseGuards(JwtAuthGuard) в server\src\auth\auth.controller.ts)
            }
        })
        if (data) return data
    }
}