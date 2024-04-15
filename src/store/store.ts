// All Slices. For Redux-Toolkit
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/modesDateSlice'
import selectedModeMonitorReducer from './features/selectedModeMonitorSlice'
import popupDataReducer from './features/popupDataSlice'
import readingMarkerWarning from './features/markerWarningSlice'
import arrWarningReducer from './features/arrWarningSlice'


export const store = configureStore({
  reducer: {
    menu: menuReducer, // режим меню
    selectedModeMonitor: selectedModeMonitorReducer, // режим отображения заголовка (месяц, неделя и т.д.) шапки (Monitor) 
    popupData: popupDataReducer, // содержание MyPopup.tsx
    markerWarning: readingMarkerWarning, // Warning part 1: push array, exemple: [true, false, fasle]. Rendering each: HelperWarningMarker.tsx
    arrWarning: arrWarningReducer, // Warning part 2: indicator (true/false or on/off). Rendering: WeekGrid.tsx
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

