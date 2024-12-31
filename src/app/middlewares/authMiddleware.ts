import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants';
import { sendFailApiResponse } from '../helpers/apiResponse';

export function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        sendFailApiResponse(res, 'User not authorized', [], 401);
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Unauthorized' });
        sendFailApiResponse(res, 'Unauthorized', [], 401);
    }
}

export default verifyToken;
