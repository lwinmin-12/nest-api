import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  async getBookmarks() {
    return await this.prismaService.bookmark.findMany();
  }
  async getBookmarkById(id: string): Promise<any> {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: {
        id,
      },
    });
    return bookmark;
  }

  async createBookmark(dto: BookmarkDto) {
    const user = await this.prismaService.user.findUnique({
        where : {
            id : dto.userId
        }
    })
    if(!user) {
        throw new NotFoundException('user not found')
    }
    return await this.prismaService.bookmark.create({
      data: {
        ...dto,
      },
    });
  }

  editBookmark(id: string, dto: BookmarkDto) {
    const checkBookmark = this.prismaService.bookmark.findUnique({
      where: {
        id,
      },
    });
    if (!checkBookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.prismaService.bookmark.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }
  
  deleteBookmark(id: string) {
    const checkBookmark = this.prismaService.bookmark.findUnique({
      where: {
        id,
      },
    });
    if (!checkBookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.prismaService.bookmark.delete({
      where: {
        id,
      },
    });
  }
}
