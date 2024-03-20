//! Warning Marker - part 2 (array)
// redux-toolkit - Slice 
//! массив для Warning Marker, например: 
// [true, false, false].indexOf( true ) != -1)) : 'меняю состояние на true у warningMarkerSlice на true' ? dispatch(false)
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! true - нужно принять ЛС / false (по-умолчанию) - нет
const initialState  = {
  arr: []
} // по-умолчанию (не время для приёма )

// readingArrWarning
export const arrWarningSlice = createSlice({
    name: 'arrWarning',
    initialState,
    reducers: {
      arrWarningPushTrue: (state, action) => {
          state.arr = [...state.arr, ...action.payload]
        },
      arrWarningPushFalse: (state, action) => {
        state.arr = [...state.arr, ...action.payload]
        },
      arrWarningCleare: (state) => {
        state.arr.length = 0
        },
        
    },
  })
  
  export const { arrWarningPushTrue, arrWarningPushFalse, arrWarningCleare } = arrWarningSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.arrWarning.arr
  
  export default arrWarningSlice.reducer