import { IResponse, ResponseStatus } from "./interfaces/response.interface";


export class ResponseDto implements IResponse {
    status: ResponseStatus;
    message: string;
    data: any;

    constructor(status: string, message: string, data?: any) {
        this.status = <ResponseStatus>status;
        this.message = message;
        this.data = data;
    }
}