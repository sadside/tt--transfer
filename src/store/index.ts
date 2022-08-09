import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import calculatorSlice from './calculatorSlice'
import zoneReducer from './zoneSlice'

export const store = configureStore({
	reducer: {
		user: userReducer,
		calculator: calculatorSlice,
		zone: zoneReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
