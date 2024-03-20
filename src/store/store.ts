// For Redux-Toolkit
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/modesDateSlice'
import selectedModeMonitorReducer from './features/selectedModeMonitorSlice'
import popupDataReducer from './features/popupDataSlice'
import warningMarkerReducer from './features/warningMarkerSlice'
import arrWarningReducer from './features/arrWarningSlice'
import halfHourItemReducer from './features/halfHourItemSlice'





export const store = configureStore({
  reducer: {
    menu: menuReducer, // режим меню
    selectedModeMonitor: selectedModeMonitorReducer, // режим отображения заголовка (месяц, неделя и т.д.) шапки (Monitor) 
    popupData: popupDataReducer, // содержание MyPopup.tsx
    warningMarker: warningMarkerReducer, // Warning part 1: предупреждение (примите ЛС): текущее время совпадает с приёмом лекарства 
    arrWarning: arrWarningReducer, // Warning part 2
    halfHourItem: halfHourItemReducer, // Warning part 3
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

