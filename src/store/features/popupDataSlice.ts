// redux-toolkit - Slice 
// отображение данных в MyPopup.tsx
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! данные текущего ЛС (по-умолчанию)
const initialState: string  = 'Popup - значение по умолчанию';

export const popupDataSlice = createSlice({
  name: 'popupData',
  initialState,
  reducers: {
    readingPopupData: (state, action) => (
        state = action.payload // наприме: {id: 3, title: 'Month', format: 'MMMM'} (из dataMenu.ts)
    )
  },
})

export const { readingPopupData } = popupDataSlice.actions

// тип RootState идёт из store.tx и возращается редюсер popupDataReducer (также из store.tx), который имеет значение этого Slice
export const selectCount = (state: RootState) => state.popupData

export default popupDataSlice.reducer