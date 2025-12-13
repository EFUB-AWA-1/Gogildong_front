import axiosInstance from '@/common/api/axiosInstance';
import axios from 'axios';

export interface PresignedUrlResponse {
  uploadUrl: string;
  fileUrl: string;
  objectKey?: string;
}

export const getPresignedUrl = (filename: string, contentType: string) => {
  return axiosInstance.get<PresignedUrlResponse>('/s3/presigned-url', {
    params: { filename, contentType }
  });
};

export const uploadFileToPresignedUrl = (
  uploadUrl: string,
  file: Blob,
  contentType: string
) => {
  console.log(contentType);
  return axios.put(uploadUrl, file, {
    headers: { 'Content-Type': contentType },
    withCredentials: false
  });
};

export const dataUrlToFile = (
  dataUrl: string,
  filename: string,
  contentType: string
): File => {
  const arr = dataUrl.split(',');
  const bstr = atob(arr[1]);
  const len = bstr.length;
  const u8arr = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new File([u8arr], filename, { type: contentType });
};
