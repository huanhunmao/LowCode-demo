import { FileCheckService } from './file-check-service';
import { FileInfoService } from './file-info-service';
import { FileListService } from './file-list-service';
declare const info: FileInfoService;
declare const check: FileCheckService;
declare const list: FileListService;
export { check, info, list };
