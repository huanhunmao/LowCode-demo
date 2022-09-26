export declare class PagingReq {
    page?: number;
    size?: number;
}
export declare class PagingRes extends PagingReq {
    total?: number;
}
export declare class ResponseBase {
    code: number;
    msg?: string;
    err: string;
}
export declare class ResponsePageBase extends ResponseBase {
    pageInfo: PagingRes;
}
export declare class CreatorInfo {
    id: string;
    account: string;
}
export declare class App {
    applicationId: string;
}
export declare class ContentIdVersion {
    id: string;
    version: string;
}
