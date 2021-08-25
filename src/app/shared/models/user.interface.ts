export interface User {
    username: string;
    password: string;
}

export interface UserResponse { 
    token: string;
    user: {};
    message: string;
}