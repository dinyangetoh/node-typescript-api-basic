export const APP_PORT = Number(process.env.APP_PORT) || 3001;

export const JWT_SECRET = process.env.JWT_SECRET || 'Random_Secret';
export const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h';
