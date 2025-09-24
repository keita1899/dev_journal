import axiosInstance from './axios'

/**
 * SWRに渡すためのfetcher関数
 * @param url APIのエンドポイントのパス
 * @returns 取得したデータ (JSON)
 */
export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data)
