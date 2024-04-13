//! Popup со списком лекарств на текущий день. в режиме 'Month'
// для MyPopupList.tsx, MonthGrid.tsx, CounterMonth
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'


const initialState: boolean   = false // по-умолчанию окно (MyPopupLust.tsx) закрыто

export const popupListSlice = createSlice({
  name: 'popupListState',
  initialState,
  reducers: {
    readingPopupListState: (state, action) => (
        state = action.payload 
    )
  },
})

export const { readingPopupListState } = popupListSlice.actions

// тип RootState идёт из store.tx и возращается редюсер popupDataReducer (также из store.tx), который имеет значение этого Slice
export const selectCount = (state: RootState) => state.popupData

export default popupListSlice.reducer