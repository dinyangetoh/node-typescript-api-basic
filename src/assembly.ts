import { PrismaClient } from '@prisma/client';
import AppController from './app/controllers/AppController';
import UserController from './app/controllers/UserController';
import UserRepository from './app/repositories/UserRepository';
import AppService from './app/services/AppService';
import UserService from './app/services/UserService';

const prisma = new PrismaClient();

function getUserRepository(): UserRepository {
    return new UserRepository(prisma);
}

export function getUserService(): UserService {
    return new UserService(getUserRepository());
}

function getAppService(): AppService {
    return new AppService();
}

export function getAppController(): AppController {
    return new AppController(getAppService());
}

export function getUserController(): UserController {
    return new UserController(getUserService());
}
