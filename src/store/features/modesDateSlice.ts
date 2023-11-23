//! redux-toolkit - Slice (шаблон кода из документации)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// index active menu (по-умолчанию)
const initialState: number = 3;


export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    readingMenu: (state, action) => (
        state = action.payload // наприме: {id: 3, title: 'Month', format: 'MMMM'} (из dataMenu.ts)
    )
  },
})

export const { readingMenu } = menuSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.menu

export default menuSlice.reducer