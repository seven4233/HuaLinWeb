import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = 'user/avatar' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: any,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      // baseURL:"http://111.230.25.143:3000",
      baseURL:"http://localhost:3000",
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
