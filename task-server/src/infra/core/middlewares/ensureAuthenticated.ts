import { Request, Response, NextFunction } from 'express';
import admin from '../../database/config/firebase-config';

export class Middleware {
  async decodeToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader,"authHeader",req.cookies)

    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: Access Token Missing or Invalid' });
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      console.log(decodeValue,"decodeValue")
      if (decodeValue) {
        req.body.user = decodeValue;
        return next();
      }
      return res.status(401).json({ message: 'Unauthorized: Invalid Token' });
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

