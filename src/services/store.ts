import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './API/Auth'
import { ServicesApi } from './API/ServicesAPI'
import { ProductsAPI } from './API/productsAPI'
import { ReviewAPI } from './API/review'
import { messageAPI } from './API/messageAPI'
import { orderSlice } from './Slice/orderSlice'
import { orderAPI } from './API/orderAPI'
import { servicesSlice } from './Slice/servicesSlice'

export const store = configureStore({
  reducer: {
    //  API reducers
    [authApi.reducerPath]: authApi.reducer,
    [ServicesApi.reducerPath]: ServicesApi.reducer,
    [ProductsAPI.reducerPath]: ProductsAPI.reducer,
    [ReviewAPI.reducerPath]: ReviewAPI.reducer,
    [messageAPI.reducerPath]: messageAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    

    //Slice 
    order:orderSlice.reducer,
    services:servicesSlice.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware, 
      ServicesApi.middleware,
      ProductsAPI.middleware,
      ReviewAPI.middleware,
      messageAPI.middleware,
      orderAPI.middleware,
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;