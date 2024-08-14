import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Cell, CellGroup, KindTips, toastText } from '@/components';
import { sameKindTips } from '@/constants';
import { exChangeRevenue, withdrawalVerify } from '@/services/withdraw';
import { useGlobalStore, useUserInfoStore } from '@/mobx';
import { Score } from '@/components/score';
import { useNavigation, useLanguage } from '@/hooks';

// 提现入口
function Audit() {
  const { formatMsg } = useLanguage();
  const [auditData, setAuditData] = useState<{}>({});
  const { token, nickname } = useUserInfoStore();
  const navigate = useNavigation();
  const canWithdraw = useRef(true);
  const [payWayVerify, setPayWayVerify] = useState({});
  const { changeState } = useGlobalStore();

  // 处理点击事件
  const handleClick = useCallback(async () => {
    if (token) {
      if (canWithdraw.current) {
        toastText(`${formatMsg('noBindCard')}`);
        return;
      }
      navigate('./withdraw', { state: payWayVerify });
    } else {
      navigate('/login');
    }
  }, [navigate, payWayVerify, token, formatMsg]);

  useEffect(() => {
    changeState('isLoading', true);
    exChangeRevenue()
      .then((res: any) => {
        setAuditData(res.Data);
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
    withdrawalVerify()
      .then((res: any) => {
        if (res.Data) {
          if (
            res.Data?.Bank === false &&
            res.Data?.Go === false &&
            res.Data?.USDT === false
          ) {
            toastText(`${formatMsg('noBindCard')}`);
            return;
          }
          setPayWayVerify(res.Data);
          canWithdraw.current = false;
        } else {
          toastText(`${formatMsg('verificationFiled')}`);
        }
      })
      .catch(() => {});
  }, [changeState, formatMsg]);

  return (
    <>
      {/* 用户信息 */}
      <Cell
        size='small'
        className='bg-main'
        title={
          <div className='m-0-50'>
            <span className='wds-sm-con color-con-ass'>{formatMsg('account')}:</span>
            <span className='wds-sm-con color-primary-text'>{nickname}</span>
          </div>
        }
        rightSolt={
          <div className='m-0-50'>
            <span className='wds-sm-con color-con-ass'>{formatMsg('accountNum')}</span>
            <span className='wds-sm-con color-primary-text'>
              <Score />
            </span>
          </div>
        }
        isDivider={false}
      />
      {/* 提示信息 */}
      <div className='bg-body'>
        <CellGroup className=''>
          <Cell
            className='m-r-50 m-t-30'
            size='small'
            title={formatMsg('TotalActiveBets')}
            titleClassName='wds-con'
            rightSolt={
              <div className='df-fdc jc-end color-red'>
                {auditData['ValidBetScore']}
              </div>
            }
          />
          <Cell
            className='m-r-50'
            size='small'
            title={formatMsg('PreferentialAudit')}
            titleClassName='wds-con'
            isDivider={false}
            rightSolt={
              <div>
                <span className='wds-sm-con color-con-ass'>
                  {formatMsg('deductPreferentialAudit')}
                </span>
                <span className='wds-con color-red'>
                  {auditData['RewardDeductScore']}
                </span>
              </div>
            }
          />
          <Cell
            className='m-r-50'
            size='small'
            title={formatMsg('regularAudit')}
            titleClassName='wds-con'
            isDivider={false}
            rightSolt={
              <div>
                <span className='wds-sm-con color-con-ass'>
                  {formatMsg('administrativeFees')}
                </span>
                <span className='wds-con color-red'>
                  {auditData['NormalDeductScore']}
                </span>
              </div>
            }
          />
          <Cell
            className='m-r-50'
            size='small'
            title={formatMsg('withdrawalCommission')}
            titleClassName='wds-con'
            isDivider={false}
            rightSolt={
              <div>
                <span className='wds-sm-con color-con-ass'>
                  {auditData['HourCount']}
                  {formatMsg('WithinTheHour')}
                  {auditData['ExtraFreeCount']}
                  {formatMsg('freeServiceCharge')}
                </span>
                <span className='wds-con color-red'>
                  {auditData['ExtraRevenue']}
                </span>
              </div>
            }
          />
          <Cell
            className='m-r-50'
            size='small'
            titleClassName='wds-con'
            title={formatMsg('commissionDiscount')}
            rightSolt={
              <div>
                <span className='wds-sm-con color-con-ass'>{formatMsg('coDeductible')}</span>
                <span className='wds-con color-red'>
                  {auditData['TotalDeductScore']}
                </span>
              </div>
            }
          />
          <Cell
            className='m-r-50'
            size='small'
            titleClassName='wds-con'
            title={formatMsg('auditTime')}
            isDivider={false}
            rightSolt={
              <div className='wds-sm-con color-con-ass'>
                <span>{auditData['CheckDate']}</span>
                <span>({formatMsg('dongbaquTime')})</span>
              </div>
            }
          />
        </CellGroup>
      </div>

      <div className='m-t-30 m-0-50 p-30'>
        {/* <OutLink href='./withdraw'> */}
        <Button
          className='w-full'
          type='primary'
          size='large'
          onClick={handleClick}
        >
          {formatMsg('withdrawDeposit')}
        </Button>
        {/* </OutLink> */}
      </div>

      <KindTips className='m-t-2' data={sameKindTips} />
    </>
  );
}

export default memo(Audit);
