import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import counterReducer from '../features/counter/counterSlice';
import todosReducer from '../features/todos/todosSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    todos:todosReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
