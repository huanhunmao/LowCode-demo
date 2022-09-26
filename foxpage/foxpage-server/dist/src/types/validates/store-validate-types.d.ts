import { ResponsePageBase } from './index-validate-types';
export declare class StoreGoodsDetail {
    id: string;
    name: string;
    intro: string;
    type: string;
    detail: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class GetPageTemplateListReq {
    appIds: string[];
    type?: string;
    page?: number;
    size?: number;
}
export declare class GetPackageListReq {
    appIds: string[];
    type?: string;
    page?: number;
    size?: number;
}
export declare class GetFileListReq {
    type: string;
    appIds: string[];
    search?: string;
    page?: number;
    size?: number;
}
export declare class GetPageTemplateListRes extends ResponsePageBase {
    data: StoreGoodsDetail;
}
export declare class AddGoodsToApplicationReq {
    appIds: string[];
    goodsIds: string[];
    delivery: string;
}
export declare class AddGoodsItemTpApplicationReq extends AddGoodsToApplicationReq {
    type: string;
}
export declare class GetStorePackageListRes extends ResponsePageBase {
    data: StoreGoodsDetail;
}
export declare class AddGoodsToStoreReq {
    applicationId: string;
    id: string;
    type: string;
    intro: string;
}
export declare class OfflineGoodsFromStoreReq {
    applicationId: string;
    id: string;
}
