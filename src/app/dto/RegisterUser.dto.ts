import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8, 32)
    password: string;
}
