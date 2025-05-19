import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserService {
    constructor(private prismaService : PrismaService) {}

    async updateUser(id : string , dto) {
        const checkUser = await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
        if (!checkUser) {
            throw new NotFoundException('User not found');
        }
        const user = await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        });
        delete (user as any).hash;
        return user;
    }


}