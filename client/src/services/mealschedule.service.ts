import { instance } from "../api/axios.api";
import { IMealSchedule, IMealscheduleRepository } from "../types/types";

export const MealScheduleService = {
    // post (create)
    async create(mealschedule: IMealSchedule): Promise<IMealscheduleRepository | undefined> {
        const { data } = await instance.post<IMealscheduleRepository>('mealschedules', mealschedule); // http://localhost:3000/api/mealschedules
        return data
    },

    // получить (по id) созданный график (относящиеся к текущему авторизированному user)
    async getOne(id: string): Promise<IMealscheduleRepository | undefined> { // используется в client\src\App.tsx
        const { data } = await instance.get<IMealscheduleRepository>(`mealschedules/mealschedule/${+id}`)
        if (data) return data
    },
}