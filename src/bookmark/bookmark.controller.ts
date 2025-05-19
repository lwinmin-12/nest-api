import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto } from './dto/bookmark.dto';
import { EditBookmarkDto } from './dto/editBookmark.dto';

@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService : BookmarkService) {}

    @Get()
    getBookmarks() {
       return this.bookmarkService.getBookmarks();
    }

    @Get(':id')
    getBookmarkById(@Param('id') id: string) {
      return this.bookmarkService.getBookmarkById(id);
    }

    @Post()
    createBookmark(@Body() dto : BookmarkDto) {
        return this.bookmarkService.createBookmark(dto)
    }

    @Patch(':id')
    editBookmark(@Param('id') id : string , @Body() dto : EditBookmarkDto) {
        return this.bookmarkService.editBookmark(id , dto)
    }

    @Delete(':id')
    deleteBookmark(@Param('id') id : string) {
        return this.bookmarkService.deleteBookmark(id)
    }
}
