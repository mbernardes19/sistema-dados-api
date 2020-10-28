export default interface UserDto {
    id?: number;
    email: string;
    name: string;
    password: string;
    isAdmin: boolean;
    enterpriseName: string;
}