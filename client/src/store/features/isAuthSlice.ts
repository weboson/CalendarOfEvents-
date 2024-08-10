//! indicator Warning Marker - part 1 (indicator)
// redux-toolkit - Slice 
// Чтобы получить состояние данных: => const markerWarning = useAppSelector((state) => state.markerWarning) 
//- использую в HelperWarningMarker.tsx, GridDayWithHours -> DependingEating/DependingBreakfast/DependingSupper.tsx;
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingMarkerWarning(new data)) 
//! Авторизирован или нет: т.е. вошел ли user или нет в свой аккаунт
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// Чтобы получить состояние данных: => const isAuth = useAppSelector((state) => state.isAuth) 
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingisAuth(new data))
const initialState: boolean = false // по-умолчанию НЕ "авторизирован"


export const isAuthSlice = createSlice({
    name: 'isAuth',
    initialState,
    reducers: {
      readingisAuth: (state, action) => (
          state = action.payload // exemple: false = true
      )
    },
  })
  
  export const { readingisAuth } = isAuthSlice.actions
  // тип RootState идёт из store.tx - нужно добавить в store.ts - чтобы isAuth не был ошибкой
  export const selectCount = (state: RootState) => state.isAuth
  
  export default isAuthSlice.reducer