import { PrismaClient, User } from '@prisma/client';

export default class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    public async createUser(email: string, passwordHash: string): Promise<void> {
        try {
            await this.prisma.user.create({ data: { email, passwordHash } });
            this.prisma.$disconnect();
        } catch (error) {
            this.prisma.$disconnect();
            console.error(error);
            throw new Error('data access error');
        }
    }

    public async getUser(email: string): Promise<User> {
        return this.prisma.user.findFirst({ where: { email } });
    }
}
