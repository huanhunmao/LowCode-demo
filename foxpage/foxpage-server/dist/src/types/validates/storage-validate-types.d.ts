export declare class StorageListReq {
    applicationId: string;
    prefix: string;
    bucket: string;
    page?: number;
    size?: number;
}
export declare class DownloadObjectsReq {
    applicationId: string;
    prefix: string;
}
export declare class UploadObjectsReq {
    applicationId: string;
    prefix: string;
    bucket: string;
    targetBucket: string;
    targetPrefix: string;
}
