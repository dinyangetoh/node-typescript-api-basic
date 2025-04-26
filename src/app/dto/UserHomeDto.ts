import { IsEnum, IsString } from 'class-validator';

export class UserHomeDto {
    @IsString()
    test: string;
}

export class UserHomeParamsDto {
    @IsString()
    @IsEnum(['user', 'admin'])
    userId: string;
}
