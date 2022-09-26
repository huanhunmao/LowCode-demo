import { ContentVersion, DSL } from '@foxpage/foxpage-server-types';
export declare class ContentMockService {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentMockService
     */
    static getInstance(): ContentMockService;
    /**
     * get content extensions, eg. extendId, mockId
     * @param contentIds
     */
    getContentExtension(contentIds: string[]): Promise<Record<string, any>>;
    /**
     * get mock content build version, if not build version,  max version, get the live
     * @param contentIds
     * @returns
     */
    getMockBuildVersions(contentIds: string[]): Promise<Record<string, any>>;
    /**
     * Get content mock live versions, if no live version, response empty
     * Response object {contentId: mockContentVersion}
     * @param contentIds
     * @returns
     */
    getMockLiveVersions(contentIds: string[]): Promise<Record<string, any>>;
    /**
     * Get mock relation details
     * @param versionList
     * @returns
     */
    getMockRelations(versionList: ContentVersion[]): Promise<Record<string, DSL[]>>;
}
