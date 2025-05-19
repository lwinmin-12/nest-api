import { IsNotEmpty, IsString } from "class-validator";

export class BookmarkDto {
    @IsString({ message: 'Invalid title' })
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @IsString({ message: 'Invalid url' })
    @IsNotEmpty({ message: 'Url is required' })
    url: string;


    @IsString({ message: 'Invalid userId' })
    @IsNotEmpty({ message: 'UserId is required' })
    userId : string;
}