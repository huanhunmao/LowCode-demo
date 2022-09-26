import { ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class LogRequestContent {
    user: string;
    requestTime: number;
    responseTime: number;
    tooks: number;
    applicationId: string;
    request: object;
    response: object;
}
export declare class LogDetail {
    id: string;
    transactionId: string;
    operator: string;
    action: string;
    content: LogRequestContent;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class WorkspaceDynamicListReq {
    organizationId: string;
    applicationId: string;
    search: string;
    page: number;
    size: number;
    startTime: number;
    endTime: number;
}
export declare class DynamicListRes extends ResponsePageBase {
    data: Array<LogDetail>;
}
export declare class WorkspaceRequestReq {
    transactionId: string;
}
export declare class RequestResData {
    request: LogDetail;
    details: LogDetail;
}
export declare class RequestDetailsRes extends ResponseBase {
    data: RequestResData;
}
export declare class WorkspaceHistoryReq {
    id: string;
    page: number;
    size: number;
}
