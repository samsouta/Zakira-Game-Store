import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UserProps {
    adminStatus: boolean ;
}
const initialState: UserProps = {
    adminStatus: localStorage.getItem('is_Admin_online') === 'true',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAdminStatus(state, action: PayloadAction<boolean>) {
            state.adminStatus = action.payload;
            // Store order data in localStorage
            localStorage.setItem('is_Admin_online', String(action.payload));

        },

    }
})

export const { setAdminStatus } = userSlice.actions
export default userSlice.reducer;
