import { memo, useCallback, useEffect, useState } from 'react';
import {
  Button,
  CellGroup,
  FormDemo as Form,
  FormItem,
  Input,
  KindTips,
  Picker,
  toastText,
} from '@/components';
import { Obj, kefuKindTips } from '@/constants';
import { bankWithdraw, getUserWithdrawalCardList } from '@/services/withdraw';
import { Score } from '@/components/score';
import styles from '../index.module.scss';
import { useGlobalStore, useUserScoreStore } from '@/mobx';
import { getUserScoreInfo } from '@/services';
import { useLanguage, useNavigation } from '@/hooks';

function CarddrawInfo() {
  const [bankCardList, setBankCardList] = useState<any[]>([]);
  const [other, setOther] = useState<any[]>([]);
  const [currentCard, setCurrentCard] = useState<Obj>({});
  const [availableAmount, setAvailableAmount] = useState<number>(0);

  const [withdrawPsd, setWithdrawPsd] = useState<string>('');
  const { score, changeUserScore } = useUserScoreStore();
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  const [form] = Form.useForm();
  const chooseBank = useCallback(
    (item) => {
      if (item.length > 0) {
        form.setFieldsValue({
          name2: item[0]?.userName,
          name3: item[0]?.bankNumber,
        });
        setCurrentCard(item[0]);
      }
    },
    [form]
  );

  useEffect(() => {
    changeState('isLoading', true);
    getUserWithdrawalCardList()
      .then((res: any) => {
        if (res.Data && res.Data.List) {
          if (res.Data.List.length <= 0) {
            toastText(`${formatMsg('youNotBindCard')}`);
          } else {
            setOther(res.Data.Other);
            setBankCardList([
              ...res.Data.List.map((item) => ({
                value: item.Id,
                text: item.BankName,
                userName: item.Name,
                bankNumber: item.CardNumber,
              })),
            ]);
          }
        } else {
          toastText(`${formatMsg('youNotBindCard')}`);
        }
      })
      .catch(() => {
        toastText(`${formatMsg('dataAcquisitionFailure')}`);
      })
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState, formatMsg]);

  /// 获取输入的提现金额
  const getAmount = (value) => {
    let tempVal = 0;
    if (value !== null && value !== '') {
      const OtherAmount = other[0]['Amount'];

      if (value - OtherAmount > 0) {
        tempVal = value - OtherAmount;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
    const res = tempVal.toFixed(3);
    return parseFloat(res.substring(0, res.lastIndexOf('.') + 3));
  };

  const handleChange = (e: any) => {
    setAvailableAmount(getAmount(e));
  };

  const handlePsw = (e: any) => {
    setWithdrawPsd(e);
  };

  // 触发提交的按钮点击事件
  const handleSubmit = useCallback(
    (_, resolve) => {
      form
        .validate()
        .then(() => {
          if (withdrawPsd.length === 0) {
            toastText(`${formatMsg('entryWithdrawPsd')}`);
            resolve && resolve();
            return;
          }
          const e = form.getFieldValue('withdrawMoney');
          if (e <= 0) {
            toastText(`${formatMsg('overBalanceHand')}`);
            resolve && resolve();
            return;
          }
          if (e > score) {
            toastText(`${formatMsg('overBalanceHand')}`);
            resolve && resolve();
            return;
          }
          changeState('isLoading', true);
          bankWithdraw({
            Amount: parseFloat(e),
            cardId: currentCard?.value || bankCardList[0].value,
            pwd: withdrawPsd,
          })
            .then((res: any) => {
              if (res.Code === 210) {
                // toastText(res.Message);
                const msgObj = JSON.parse(res.Message);
                toastText(formatMsg(msgObj?.key, msgObj?.parm));
                getUserScoreInfo()
                  .then((res: any) => {
                    if (res.Data) changeUserScore(res.Data);
                    navigate('/mine', { replace: true });
                  })
                  .catch(() => {});
              }
            })
            .catch(() => {})
            .finally(() => {
              changeState('isLoading', false);
              resolve && resolve();
            });
        })
        .catch((err) => {
          console.log({ err });
          toastText(err[0]?.message);
          resolve && resolve();
        });
    },
    [
      form,
      withdrawPsd,
      score,
      currentCard,
      changeUserScore,
      navigate,
      changeState,
      bankCardList,
      formatMsg,
    ]
  );

  return (
    <>
      <Form
        className={`bg-main m-t-30 p-0 ${styles['wd-form-box']}`}
        form={form}
      >
        <CellGroup className='p-0-50'>
          <FormItem
            name='name1'
            label={formatMsg('MasterAccountBalance')}
            labelClassname={`${styles.wM258} color-con-ass wds-sm-title`}
          >
            <div className='wds-sm-title color-red m-l-50'>
              <Score />
            </div>
          </FormItem>
          <FormItem
            name='bankType'
            label={formatMsg('withdrawBankCard')}
            initialValue={
              bankCardList.length > 0 ? [bankCardList[0].value] : ''
            }
            labelClassname={styles.wM258}
          >
            {bankCardList.length > 0 ? (
              <Picker
                listData={bankCardList}
                placeholder={formatMsg('PleaseSelectWithdrawalBank')}
                onConfirm={chooseBank}
                labelClassName='pl-50'
              />
            ) : (
              <Input placeholder={formatMsg('PleaseSelectWithdrawalBank')} />
            )}
          </FormItem>
          <FormItem
            name='name2'
            initialValue={
              bankCardList.length > 0 ? bankCardList[0].userName : ''
            }
            label={formatMsg('name')}
            labelClassname={styles.wM258}
          >
            <Input readOnly />
          </FormItem>
          <FormItem
            name='name3'
            initialValue={
              bankCardList.length > 0 ? bankCardList[0].bankNumber : ''
            }
            label={formatMsg('collectionCardNumber')}
            labelClassname={styles.wM258}
          >
            <Input readOnly />
          </FormItem>
          <FormItem
            name='withdrawMoney'
            label={formatMsg('wcashWthdrawalAmount')}
            labelClassname={styles.wM258}
          >
            <Input
              placeholder={formatMsg('enterWithdrawalAmount')}
              type='number'
              onChange={handleChange}
            />
          </FormItem>
          <FormItem name='psd' label={formatMsg('withdrawPSW')} labelClassname={styles.wM258}>
            <Input
              placeholder={formatMsg('entryWithdrawPsd')}
              type='password'
              onChange={handlePsw}
            />
          </FormItem>
        </CellGroup>
        <CellGroup className='p-0-50 m-t-30'>
          <FormItem
            name='titlefee'
            label={formatMsg('sureAmount')}
            labelClassname={`${styles.wM258} color-con-ass`}
          >
            <div />
          </FormItem>
          <FormItem name='name5' label={formatMsg('serviceCharge')} labelClassname={styles.wM258}>
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-red'>
                {other.length > 0 ? other[0]['Amount'] : ''}
              </div>
            </div>
          </FormItem>
          <FormItem
            name='name'
            label={formatMsg('receivableAmount')}
            labelClassname={styles.wM258}
          >
            <div className='d-f jc-end flex-1'>
              <div className='wds-sm-title color-primary-text'>
                {availableAmount}
              </div>
            </div>
          </FormItem>
        </CellGroup>
      </Form>
      <div className='m-t-30 m-0-50 p-30'>
        <Button
          isPromise
          onClick={handleSubmit}
          className='w-full'
          type='primary'
          size='large'
        >
          {formatMsg('Submit')}
        </Button>
      </div>
      <div className='color-primary ta-c wds-con'>
        {`${formatMsg('depositYueBao')}${other.length > 0 ? other[0]['Rate'] : ''}`}
      </div>

      <KindTips className='m-t-2' data={kefuKindTips} />
    </>
  );
}

export default memo(CarddrawInfo);
