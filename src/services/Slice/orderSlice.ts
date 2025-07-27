import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface OrderDetail {
  orderId: string;
  orderType: string;
  image: string;
  title: string;
  totalPrice: number;
  game_uid : string;
  game_server: string;
}

interface OrderState {
  orderData: OrderDetail | null;
  diaData : OrderDetail | null;
}

const initialState: OrderState = {
  orderData: localStorage.getItem('orderData') ? JSON.parse(localStorage.getItem('orderData')!) : null,
  diaData: localStorage.getItem('diaData') ? JSON.parse(localStorage.getItem('diaData')!) : null,
};

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers: {
        setOrder(state, action: PayloadAction<OrderDetail>) {
            state.orderData = action.payload;
            // Store order data in localStorage
            localStorage.setItem('orderData', JSON.stringify(action.payload));
        },

        // /tempor...dia data 
        setDiaData(state, action: PayloadAction<OrderDetail>) {
            state.diaData = action.payload;
            // Store order data in localStorage
            localStorage.setItem('diaData', JSON.stringify(action.payload));
        },
        
    }
})

export const {setOrder , setDiaData} = orderSlice.actions
export default orderSlice.reducer;
