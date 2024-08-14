export namespace CMD_CHANGLONG {
	/** 2901*/
	// 长龙主类型
	export enum emChangLongMainType_2901 {
		CLMT_TE_DX0, //特码-大小
		CLMT_TE_DS, //特码-单双
		CLMT_TE_BO, //特码-波色
		CLMT_TE_LHH, //特码-龙虎和
		CLMT_COUNT, //长龙主类型数目
		CLMT_INVALID, //无效长龙主类型
	}
	// emChangLongMainType_2901 CLMT_INVALID = emChangLongMainType_2901.values[0xFF]; //无效长龙主类型

	//长龙子类型 - 特码-大小
	export enum emChangLongSubTypeTeDX_2901 {
		CLST_TDX_DA0, //大
		CLST_TDX_XIAO, //小
	}

	//长龙子类型 - 特码-单双
	export enum emChangLongSubTypeTeDS_2901 {
		CLST_TDS_DAN, //单
		CLST_TDS_SHUANG, //双
	}

	//长龙子类型 - 特码-波色
	export enum emChangLongSubTypeTeBO_2901 {
		CLST_TBO_HONG, //红
		CLST_TBO_LAN, //蓝
		CLST_TBO_LV, //绿
	}

	//长龙子类型 - 特码-龙虎和
	export enum emChangLongSubTypeTeLHH_2901 {
		CLST_TLHH_LONG, //龙
		CLST_TLHH_HU, //虎
		CLST_TLHH_HE, //和
	}

	/** 2902*/
	//长龙主类型
	export enum emChangLongMainType_2902 {
		CLMT_R1_DX, //冠军-大小
		CLMT_R2_DX, //亚军-大小
		CLMT_R3_DX, //第三名-大小
		CLMT_R4_DX, //第四名-大小
		CLMT_R5_DX, //第五名-大小
		CLMT_R6_DX, //第六名-大小
		CLMT_R7_DX, //第七名-大小
		CLMT_R8_DX, //第八名-大小
		CLMT_R9_DX, //第九名-大小
		CLMT_R10_DX, //第十名-大小
		CLMT_R1_DS, //冠军-单双
		CLMT_R2_DS, //亚军-单双
		CLMT_R3_DS, //第三名-单双
		CLMT_R4_DS, //第四名-单双
		CLMT_R5_DS, //第五名-单双
		CLMT_R6_DS, //第六名-单双
		CLMT_R7_DS, //第七名-单双
		CLMT_R8_DS, //第八名-单双
		CLMT_R9_DS, //第九名-单双
		CLMT_R10_DS, //第十名-单双
		CLMT_R1_LHH, //冠军-龙虎和
		CLMT_R2_LHH, //亚军-龙虎和
		CLMT_R3_LHH, //第三名-龙虎和
		CLMT_R4_LHH, //第四名-龙虎和
		CLMT_R5_LHH, //第五名-龙虎和
		CLMT_SUM_DX, //冠亚军和-大小
		CLMT_SUM_DS, //冠亚军和-单双
		CLMT_COUNT, //长龙主类型数目
		CLMT_INVALID, //无效长龙主类型
	}

	// emChangLongMainType_2902 CLMT_INVALID =
	// emChangLongMainType_2902.values[0xFF]; //无效长龙主类型

	export const arrMainType_2902_2904 = [
		emChangLongMainType_2902.CLMT_SUM_DX.toString(), //冠亚军和-大小
		emChangLongMainType_2902.CLMT_SUM_DS.toString(), //冠亚军和-单双
		emChangLongMainType_2902.CLMT_R1_DX.toString(), //冠军-大小
		emChangLongMainType_2902.CLMT_R1_DS.toString(), //冠军-单双
		emChangLongMainType_2902.CLMT_R1_LHH.toString(), //冠军-龙虎和
		emChangLongMainType_2902.CLMT_R2_DX.toString(), //亚军-大小
		emChangLongMainType_2902.CLMT_R2_DS.toString(), //亚军-单双
		emChangLongMainType_2902.CLMT_R2_LHH.toString(), //亚军-龙虎和
		emChangLongMainType_2902.CLMT_R3_DX.toString(), //第三名-大小
		emChangLongMainType_2902.CLMT_R3_DS.toString(), //第三名-单双
		emChangLongMainType_2902.CLMT_R3_LHH.toString(), //第三名-龙虎和
		emChangLongMainType_2902.CLMT_R4_DX.toString(), //第四名-大小
		emChangLongMainType_2902.CLMT_R4_DS.toString(), //第四名-单双
		emChangLongMainType_2902.CLMT_R4_LHH.toString(), //第四名-龙虎和
		emChangLongMainType_2902.CLMT_R5_DX.toString(), //第五名-大小
		emChangLongMainType_2902.CLMT_R5_DS.toString(), //第五名-单双
		emChangLongMainType_2902.CLMT_R5_LHH.toString(), //第五名-龙虎和
		emChangLongMainType_2902.CLMT_R6_DX.toString(), //第六名-大小
		emChangLongMainType_2902.CLMT_R6_DS.toString(), //第六名-单双
		emChangLongMainType_2902.CLMT_R7_DX.toString(), //第七名-大小
		emChangLongMainType_2902.CLMT_R7_DS.toString(), //第七名-单双
		emChangLongMainType_2902.CLMT_R8_DX.toString(), //第八名-大小
		emChangLongMainType_2902.CLMT_R8_DS.toString(), //第八名-单双
		emChangLongMainType_2902.CLMT_R9_DX.toString(), //第九名-大小
		emChangLongMainType_2902.CLMT_R9_DS.toString(), //第九名-单双
		emChangLongMainType_2902.CLMT_R10_DX.toString(), //第十名-大小
		emChangLongMainType_2902.CLMT_R10_DS.toString(), //第十名-单双
	];

	//长龙子类型 - 大小
	export enum emChangLongSubTypeDX_2902 {
		CLST_DX_DA, //大
		CLST_DX_XIAO, //小
	}

	//长龙子类型 - 单双
	export enum emChangLongSubTypeDS_2902 {
		CLST_DS_DAN, //单
		CLST_DS_SHUANG, //双
	}

	//长龙子类型 - 龙虎和
	export enum emChangLongSubTypeLHH_2902 {
		CLST_LHH_LONG, //龙
		CLST_LHH_HU, //虎
		// CLST_LHH_HE, //和
	}

	/** 2905*/
	//长龙主类型
	export enum emChangLongMainType_2905 {
		CLMT_HE_DX, //总和-大小
		CLMT_HE_DS, //总和-单双
		CLMT_HE_LHH, //总和-龙虎和

		CLMT_D1_DX, //第一球-大小
		CLMT_D1_DS, //第一球-单双

		CLMT_D2_DX, //第二球-大小
		CLMT_D2_DS, //第二球-单双

		CLMT_D3_DX, //第三球-大小
		CLMT_D3_DS, //第三球-单双

		CLMT_D4_DX, //第四球-大小
		CLMT_D4_DS, //第四球-单双

		CLMT_D5_DX, //第五球-大小
		CLMT_D5_DS, //第五球-单双

		CLMT_COUNT, //长龙主类型数目
		CLMT_INVALID, //无效长龙主类型
	}

	//长龙子类型 - 大小
	export enum emChangLongSubTypeDX_2905 {
		CLST_DX_DA, //大
		CLST_DX_XIAO, //小
	}

	//长龙子类型 - 单双
	export enum emChangLongSubTypeDS_2905 {
		CLST_DS_DAN, //单
		CLST_DS_SHUANG, //双
	}

	//长龙子类型 - 龙虎和
	export enum emChangLongSubTypeLHH_2905 {
		CLST_LHH_LONG, //龙
		CLST_LHH_HU, //虎
		CLST_LHH_HE, //和
	}


	/*区域术语定义*/
	export enum emBetType {
		BT_S_0, //特码-0
		BT_S_1, //特码-1
		BT_S_2, //特码-2
		BT_S_3, //特码-3
		BT_S_4, //特码-4
		BT_S_5, //特码-5
		BT_S_6, //特码-6
		BT_S_7, //特码-7
		BT_S_8, //特码-8
		BT_S_9, //特码-9
		BT_S_10, //特码-10
		BT_S_11, //特码-11
		BT_S_12, //特码-12
		BT_S_13, //特码-13
		BT_S_14, //特码-14
		BT_S_15, //特码-15
		BT_S_16, //特码-16
		BT_S_17, //特码-17
		BT_S_18, //特码-18
		BT_S_19, //特码-19
		BT_S_20, //特码-20
		BT_S_21, //特码-21
		BT_S_22, //特码-22
		BT_S_23, //特码-23
		BT_S_24, //特码-24
		BT_S_25, //特码-25
		BT_S_26, //特码-26
		BT_S_27, //特码-27
		BT_S_DA, //特码-大 (28)
		BT_S_XIAO, //特码-小 (29)
		BT_S_DAN, //特码-单 (30)
		BT_S_SHUANG, //特码-双 (31)
		BT_S_DA_DAN, //特码-大单 (32)
		BT_S_XIAO_DAN, //特码-小单 (33)
		BT_S_DA_SHUANG, //特码-大双 (34)
		BT_S_XIAO_SHUANG, //特码-小双 (35)
		BT_S_JIDA, //特码-极大 (36)
		BT_S_JIXIAO, //特码-极小 (37)
		BT_S_HONG, //特码-红 (38)
		BT_S_LAN, //特码-蓝 (39)
		BT_S_LV, //特码-绿 (40)
		BT_A_0, //第一球-0 (4)
		BT_A_1, //第一球-1 (41)
		BT_A_2, //第一球-2 (42)
		BT_A_3, //第一球-3 (43)
		BT_A_4, //第一球-4 (44)
		BT_A_5, //第一球-5 (45)
		BT_A_6, //第一球-6 (46)
		BT_A_7, //第一球-7 (47)
		BT_A_8, //第一球-8 (48)
		BT_A_9, //第一球-9 (50)
		BT_A_DA, //第一球-大 (51)
		BT_A_XIAO, //第一球-小 (52)
		BT_A_DAN, //第一球-单 (53)
		BT_A_SHUANG, //第一球-双 (54)
		BT_B_0, //第二球-0 (55)
		BT_B_1, //第二球-1 (56)
		BT_B_2, //第二球-2 (57)
		BT_B_3, //第二球-3 (58)
		BT_B_4, //第二球-4 (59)
		BT_B_5, //第二球-5 (60)
		BT_B_6, //第二球-6 (61)
		BT_B_7, //第二球-7 (62)
		BT_B_8, //第二球-8 (63)
		BT_B_9, //第二球-9 (64)
		BT_B_DA, //第二球-大 (65)
		BT_B_XIAO, //第二球-小 (66)
		BT_B_DAN, //第二球-单 (67)
		BT_B_SHUANG, //第二球-双 (68)
		BT_C_0, //第三球-0 (69)
		BT_C_1, //第三球-1 (70)
		BT_C_2, //第三球-2 (71)
		BT_C_3, //第三球-3 (72)
		BT_C_4, //第三球-4 (73)
		BT_C_5, //第三球-5 (74)
		BT_C_6, //第三球-6 (75)
		BT_C_7, //第三球-7 (76)
		BT_C_8, //第三球-8 (77)
		BT_C_9, //第三球-9 (78)
		BT_C_DA, //第三球-大 (79)
		BT_C_XIAO, //第三球-小 (80)
		BT_C_DAN, //第三球-单 (81)
		BT_C_SHUANG, //第三球-双 (82)
		BT_D_SHUNZI, //特码-顺子 (83)
		BT_D_BAOZI, //特码-豹子 (84)
		BT_D_DUIZI, //特码-对子 (85)
		BT_D_LONG, //龙 (86)
		BT_D_HU, //虎 (87)
		BT_D_HE, //和 (88)
		BT_COUNT, //下注类型数目
		BT_INVALID //无效下注类型
	}

}