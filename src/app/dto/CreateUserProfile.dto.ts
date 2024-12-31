import { IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @Length(8, 32)
    password: string;

    @IsNotEmpty()
    @Length(3, 16)
    firstName: string;

    @IsNotEmpty()
    @Length(3, 16)
    lastName: string;
}
