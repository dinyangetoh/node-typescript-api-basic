import bcrypt from 'bcrypt';

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

async function comparePassword(password: string, userPasswordHash: string): Promise<boolean> {
    return bcrypt.compare(password, userPasswordHash);
}

export { hashPassword, comparePassword };
