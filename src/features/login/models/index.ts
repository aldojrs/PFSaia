export interface Login {
    email: null | string;
    password: null | string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    token: string;
}