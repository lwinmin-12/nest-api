import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class UserService {
    constructor(private prismaService : PrismaService) {}

    async updateUser(id : string , firstName : string , lastName : string) {
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
                firstName,
                lastName
            }
        });
        delete (user as any).hash;
        return user;
    }


}