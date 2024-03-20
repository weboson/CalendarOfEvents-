//! Warning Marker - part 3 
// redux-toolkit - Slice 
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState  = 0

// readingArrWarning
export const halfHourItemSlice = createSlice({
    name: 'halfHourItem',
    initialState,
    reducers: {
        sateHalfHourItem: (state, action) => {
            state = action.payload
        },
        
    },
  })
  
  export const { sateHalfHourItem } = halfHourItemSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.arrWarning.arr
  
  export default halfHourItemSlice.reducer