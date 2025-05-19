import { IsOptional, IsString } from "class-validator";

export class EditBookmarkDto {
    @IsString({ message: 'Invalid title' })
    @IsOptional()
    title: string;

    @IsString({ message: 'Invalid url' })
    @IsOptional()
    url: string;


    @IsString({ message: 'Invalid userId' })
    @IsOptional()
    userId : string;
}