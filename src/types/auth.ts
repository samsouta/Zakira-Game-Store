export interface FormData {
    username?: string;
    phone_number: string;
    email?: string;
    password: string;
    password_confirmation?: string;
    rememberMe?: boolean;
  }
  
  export interface ValidationErrors {
    [key: string]: string;
  }


export interface AdminResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    is_online: boolean;
  }[];
}


