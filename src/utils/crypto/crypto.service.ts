import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { configService } from '../config/config.service';

export class CryptoService {
    protected static readonly key: Buffer = createHash('sha256').update(String(configService.get<string>('CRYPTO_KEY'))).digest().slice(0, 32);
    protected static readonly iv: Buffer = createHash('sha256').update(String(configService.get<string>('CRYPTO_IV'))).digest().slice(0, 16);
    private readonly encryptionAlgorithm: string = configService.get<string>('CRYPTO_ENCRYPTION_ALGORITHM') as string;

    encrypt(text: string) {
        const cipher = createCipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return Buffer.from(encrypted, 'hex').toString('base64');
    }

    decrypt(text: string) {
        const encryptedText = Buffer.from(text, 'base64').toString('hex');
        const decipher = createDecipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}
