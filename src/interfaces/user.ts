export enum Gender {
    Male = 'male',
    Female = 'female'
}

export type User = {
    fullName: string;
    email: string;
    password: string;
    avatar?: string;
    gender: Gender;
}
export type RegisterForm = {
    fullName: string;
    email: string;
    password: string;
    avatar?: string;
    gender: Gender;
}
export type LoginForm = {
    email: string | null;
    password: string | null;
}

