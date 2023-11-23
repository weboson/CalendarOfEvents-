// redux-toolkit - Slice (шаблон кода из документации)
// текущая дата, для отображения текущего: month, year, week...
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import moment, { Moment } from 'moment';



// настройка формата вывода даты (ru-> с понедельника)
moment.updateLocale('ru', { week: { dow: 1 } }); // неделя начинается с понедельника

// состояние по-умолчанию
const initialState: Moment = moment();


export const currentDataSlice = createSlice({
  name: 'currentData',
  initialState,
  reducers: {
    readingCurrentData: (state, action) => (
        state = action.payload // текущая дата
    )
  },
})

export const { readingCurrentData } = currentDataSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.menu

export default currentDataSlice.reducer