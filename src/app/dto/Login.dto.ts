import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8, 32)
    password: string;
}
