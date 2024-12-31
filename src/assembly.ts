import AppService from './app/services/AppService';
import UserService from './app/services/UserService';
import UserRepository from './app/repositories/UserRepository';
import { PrismaClient } from '@prisma/client';

export const appService = new AppService();

const prisma = new PrismaClient();

const userRepository = new UserRepository(prisma);

export const userService = new UserService(userRepository);
