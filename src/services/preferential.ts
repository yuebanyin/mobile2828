import { post } from '@/utils/request';
import { ApiV2Prefix } from './prefix';

type ObjectType = Record<string, any>;

/** ------------优惠活动接口------------ */
// 获取优惠活动列表数据
export const getPreferentialListData = () => post(`${ApiV2Prefix}/Activity/PreferentialList`, {});

// 获取优惠活动详情数据
export const getPreferentialInfoData = (params: ObjectType) => post(`${ApiV2Prefix}/Activity/PreferentialInfo`, params);
