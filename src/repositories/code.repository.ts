import { Code, ICode, CodeCreationAttributes } from "../../db/models/Code.model";
import { JWTService } from "../utils/jwt/jwt.service";
import { ICodeRepository, TypeEnum, UserEnum } from "./interfaces/code.repository.interface";


export class CodeRepository implements ICodeRepository{
    private readonly jwtService : JWTService;
    constructor(jwtService: JWTService){
        this.jwtService = jwtService;
    }

    newCode({scope, type, id}: {scope: UserEnum, type:TypeEnum, id: string }): Promise<{hash: string, code: number}> {
        return new Promise(async (resolve, reject) => {
            try {
                let customerId = scope === UserEnum.CUSTOMER ? id : undefined
                let merchantId = scope === UserEnum.MERCHANT ? id : undefined
                let code: number;
                do {
                    code = Math.floor(100000 + Math.random() * 900000)
                } while (await this.exists(code));
                const newCode = await this.save({
                    code,
                    type,
                    customerId,
                    merchantId
                });
                const hash = this.jwtService.signPayload({id: newCode.id, code: newCode.code});
                resolve({hash, code});
            } catch (error) {
                reject(error);
            }
        });
    }
    validate(hash: string, code: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const payload = this.jwtService.verifyToken(hash);
                const codeInstance = await Code.findOne({where: {id: payload.id, code: payload.code, expires: {$gt: new Date()} }});
                resolve(!!codeInstance);
            } catch (error) {
                reject(error);
            }
        });
    }

    private exists(code: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const codeInstance = await Code.findOne({where: {code}});
                resolve(!!codeInstance);
            } catch (error) {
                reject(error);
            }
        });
    }

    private save(code: CodeCreationAttributes): Promise<ICode> {
        return new Promise(async (resolve, reject) => {
            try {
                const newCode = Code.build(code);
                await newCode.save();
                resolve(newCode as unknown as ICode);
            } catch (error) {
                reject(error);
            }
        });
    }
}