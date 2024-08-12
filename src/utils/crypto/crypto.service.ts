import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { configService } from '../config/config.service';

export class CryptoService {
    protected static readonly key: string = createHash('sha256').update(String(configService.get<string>('CRYPTO_KEY'))).digest('hex').substring(0, 32);
    protected static readonly iv: string = createHash('sha256').update(String(configService.get<string>('CRYPTO_IV'))).digest('hex').substring(0, 16);
    private readonly encryptionAlgorithm: string = configService.get<string>('CRYPTO_ENCRYPTION_ALGORITHM') as string;

    encrypt(text: string) {
        const cipher = createCipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        const encrypted = Buffer.from(
            cipher.update(text, 'utf8', 'hex') + cipher.final('hex'),
            'hex'
        ).toString('base64');
        return encrypted;
    }

    decrypt(text: string) {
        const buff = Buffer.from(text, 'base64');
        const decipher = createDecipheriv(this.encryptionAlgorithm, CryptoService.key, CryptoService.iv);
        const decrypted = decipher.update(buff.toString('hex'), 'hex', 'utf8') + decipher.final('utf8');
        return decrypted;
    }
}