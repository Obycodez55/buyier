import { sign, verify } from 'jsonwebtoken';
import { configService } from '../config/config.service';

export class JWTService {
    signPayload(payload: { [key: string]: any }): string {
        return sign(payload, configService.get<string>("JWT_SECRET_KEY")!,
            { expiresIn: '10h' }
        );
    }
    verifyToken(token: string): { [key: string]: any } {
        return <{ [key: string]: any }>verify(token, configService.get<string>("JWT_SECRET_KEY")!);
    }
}