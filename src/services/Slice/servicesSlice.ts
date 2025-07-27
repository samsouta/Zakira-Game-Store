import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ServiceType {
  gameId: number | null;
  serviceId: number | null;
  serviceName: string | null;
  description: string | null;
}

interface ServicePayload {
  service_id: number;
  game_id: number;
  name: string;
  desc: string;
}

const initialState: ServiceType = {
  gameId: localStorage.getItem('gameId') ? Number(localStorage.getItem('gameId')) : null,
  serviceId: localStorage.getItem('serviceId') ? Number(localStorage.getItem('serviceId')) : null,
  serviceName: localStorage.getItem('serviceName') || null,
  description: localStorage.getItem('description') || null
};

export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServiceData(state, action: PayloadAction<ServicePayload>) {
            state.gameId = action.payload.game_id;
            state.serviceId = action.payload.service_id;
            state.serviceName = action.payload.name;
            state.description = action.payload.desc;
            
            localStorage.setItem('gameId', action.payload.game_id.toString());
            localStorage.setItem('serviceId', action.payload.service_id.toString());
            localStorage.setItem('serviceName', action.payload.name);
            localStorage.setItem('description', action.payload.desc);
        },
    }
})

export const { setServiceData } = servicesSlice.actions
export default servicesSlice.reducer;
