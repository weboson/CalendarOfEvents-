// redux-toolkit - Slice 
// Чтобы получить состояние данных: => const warningMarker = useAppSelector((state) => state.warningMarker) 
//- использую в helperWarningMarker.ts, GridDayWithHours -> DependingEating/DependingBreakfast/DependingSupper.tsx;
// Чтобы изменить состояние данных: => const dispatch = useAppDispatch(); dispatch(readingWarningMarker(new data)) 
// - вызывается в DependingEating.tsx и т.д, а использую в helperWarningMarker.tsx;
//! Warning Marker -  Предупреждающий маркер, когда текущее время совпадает с приёмом лекарства
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

//! true - нужно принять ЛС / false (по-умолчанию) - нет
const initialState: boolean = false // по-умолчанию (не время для приёма )


export const warningMarkerSlice = createSlice({
    name: 'warningMarker',
    initialState,
    reducers: {
      readingWarningMarker: (state, action) => (
          state = action.payload // exemple: false = true
      )
    },
  })
  
  export const { readingWarningMarker } = warningMarkerSlice.actions
  
  // type RootState идёт из store.tx и возращается редюсер warningMarkerReducer (также из store.tx), который имеет значение этого Slice
  export const selectCount = (state: RootState) => state.warningMarker
  
  export default warningMarkerSlice.reducer