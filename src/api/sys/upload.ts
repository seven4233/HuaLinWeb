import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = 'basic-api/user/avatar' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: any,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      baseURL:"http://111.230.25.143:3001",
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
