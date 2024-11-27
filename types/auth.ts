export interface User {
    id: string;
    first_name: string;
    second_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    on_boarding:string,
    profile_picture_url:string
  }
  
  export interface SignUpPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }
  
  export interface SignInPayload {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }