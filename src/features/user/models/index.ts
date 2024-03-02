export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    token: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}