import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ServiceType {
  gameId: number | null;
  gameName: string | null;
  serviceId: number | null;
  serviceName: string | null;
  description: string | null;
  slug: string | null;
}

interface ServicePayload {
  service_id: number;
  service_name: string;
  game_id: number;
  game_name: string;
  desc: string;
  slug: string;
}

const initialState: ServiceType = {
  gameId: localStorage.getItem('gameId') ? Number(localStorage.getItem('gameId')) : null,
  gameName: localStorage.getItem('gameName') || null,
  serviceId: localStorage.getItem('serviceId') ? Number(localStorage.getItem('serviceId')) : null,
  serviceName: localStorage.getItem('serviceName') || null,
  description: localStorage.getItem('description') || null,
  slug: localStorage.getItem('slug') || null,
};

export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServiceData(state, action: PayloadAction<ServicePayload>) {
            state.gameId = action.payload.game_id;
            state.gameName = action.payload.game_name;
            state.serviceId = action.payload.service_id;
            state.serviceName = action.payload.service_name;
            state.description = action.payload.desc;
            state.slug = action.payload.slug;
            
            localStorage.setItem('gameId', action.payload.game_id.toString());
            localStorage.setItem('gameName', action.payload.game_name);
            localStorage.setItem('serviceId', action.payload.service_id.toString());
            localStorage.setItem('serviceName', action.payload.service_name);
            localStorage.setItem('description', action.payload.desc);
            localStorage.setItem('slug', action.payload.slug);
        },
    }
})

export const { setServiceData } = servicesSlice.actions
export default servicesSlice.reducer;
