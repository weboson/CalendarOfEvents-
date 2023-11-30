// For Redux-Toolkit
import { configureStore } from '@reduxjs/toolkit'
import menuReducer from './features/modesDateSlice'
import selectedModeMonitorReducer from './features/selectedModeMonitorSlice'





export const store = configureStore({
  reducer: {
    menu: menuReducer,
    selectedModeMonitor: selectedModeMonitorReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch