import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Button,
  Cell,
  CellGroup,
  Img,
  Switch,
  Picker,
  Input,
  FormDemo as Form,
  FormItem,
  toastText,
  Icon,
} from '@/components';
import styles from './index.module.scss';
import { useGlobalStore } from '@/mobx';
import {
  getBalance,
  getPlatformOptions,
  getYebInfo,
  setAvoidSecret,
  transfer,
  transferAll,
} from '@/services';
import { useNavigation, useLanguage } from '@/hooks';
import { formatDigit } from '@/utils/digit';

const leftDefault = [1];
const rightDefault = [2];

// 额度转换
const QuotaConvert = () => {
  const [form] = Form.useForm();
  const [platformOptions, setPlatformOptions] = useState<any[]>(null);
  const [mainBalance, setMainBalance] = useState(0.0);
  const [yebBalance, setYebBalance] = useState(0.0);
  const [secretStatus, setSecretStatus] = useState<boolean>(null);
  const init = useRef(false);
  const isRefresh = useRef(false);
  const loadCount = useRef(0);
  const disableRef = useRef(false);
  const checkRef = useRef(false);
  const navigate = useNavigation();
  const { changeState } = useGlobalStore();
  const { formatMsg } = useLanguage();

  // 触发提交的按钮点击事件
  const handleSubmit = useCallback(
    (_, resolve) => {
      if (!platformOptions) {
        resolve && resolve();
        return;
      }
      if (disableRef.current) {
        toastText(`${formatMsg('cannotTransferredAccount')}`);
        resolve && resolve();
        return;
      }
      function getFormId(val) {
        return platformOptions.find((it) => it.value === val);
      }
      form
        .validate()
        .then((res) => {
          if (res.money.length === 0) {
            toastText(`${formatMsg('transferCannotEmpty')}`);
            resolve && resolve();
            return;
          }
          const fromItem = getFormId(res.leftName[0].value);
          const toItem = getFormId(res.rightName[0].value);
          const params = {
            money: res.money,
            platformId: fromItem?.htValue,
            toPlatFormId: toItem?.htValue,
          };
          changeState('isLoading', true);
          transfer(params)
            .then((netRes: any) => {
              if (netRes.Code === 210) {
                // toastText(netRes.Message);
                const msgObj = JSON.parse(netRes.Message);
                toastText(formatMsg(msgObj?.key, msgObj?.parm));
                if (fromItem) {
                  fromItem.money -= parseFloat(res.money);
                  if (fromItem.htValue === -1) {
                    setMainBalance(fromItem?.money);
                  }
                }
                if (toItem) {
                  toItem.money += parseFloat(res.money);
                  if (toItem.htValue === -1) {
                    setMainBalance(toItem?.money);
                  }
                  setPlatformOptions([...platformOptions]);
                }
                form.setFieldsValue({ money: '' });
              } else {
                // toastText(netRes.Message);
                const msgObj = JSON.parse(netRes.Message);
                toastText(formatMsg(msgObj?.key, msgObj?.parm));
              }
              resolve && resolve();
            })
            .catch(() => {
              resolve && resolve();
            })
            .finally(() => {
              changeState('isLoading', false);
            });
        })
        .catch((err) => {
          console.log({ err });
          toastText(err[0]?.message);
        });
    },
    [form, platformOptions, changeState, formatMsg]
  );

  /**
   * @description: 一键归集
   * @param {*} useCallback
   * @return {*}
   */
  const transferAllBalance = useCallback(
    (_, resolve) => {
      if (!platformOptions) {
        resolve && resolve();
        return;
      }
      changeState('isLoading', true);
      transferAll()
        .then((res: any) => {
          if (res.Code === 210) {
            let money = 0.0;
            // 清理本地所有账号余额 除主账号外
            for (let index = 0; index < platformOptions.length; index += 1) {
              const element = platformOptions[index];
              money += element.money;
              if (element.value !== -1) {
                element.money = 0.0;
              }
            }
            // 更新主账号信息
            const mainItem = platformOptions.find((it) => it.htValue === -1);
            if (mainItem) {
              mainItem.money = money;
            }
            setMainBalance(money);
            setPlatformOptions([...platformOptions]);
          }
          // toastText(res.Message);
          const msgObj = JSON.parse(res.Message);
          toastText(formatMsg(msgObj?.key, msgObj?.parm));
          resolve && resolve();
        })
        .catch(() => {
          toastText(`${formatMsg('operationFailure')}`);
          resolve && resolve();
        })
        .finally(() => {
          changeState('isLoading', false);
        });
    },
    [changeState, platformOptions, formatMsg]
  );
  /**
   * @description: 检测是否刷新完成
   * @param {*} useCallback
   * @return {*}
   */
  const checkLoad = useCallback(() => {
    loadCount.current += 1;
    if (loadCount.current >= platformOptions.length) {
      loadCount.current = 0;
      isRefresh.current = false;
    }
  }, [platformOptions]);
  /**
   * @description: 获取账号余额
   * @param {*} useCallback
   * @return {*}
   */
  const getAccountBalance = useCallback(() => {
    if (platformOptions) {
      isRefresh.current = true;
      platformOptions.forEach((element) => {
        const { key } = element;
        getBalance(element.key)
          .then((res: any) => {
            checkLoad();
            if (res.Code === 210 && res.Data) {
              if (res.key === 'Main') {
                setMainBalance(parseFloat(res.Data?.Balance));
                setSecretStatus(res.Data.Status);
              }
              const item = platformOptions?.find((it) => it.key === res.key);
              if (item) {
                item.money = parseFloat(res.Data.Balance);
                item.isLoad = false;
                setPlatformOptions([...platformOptions]);
              }
            }
          })
          .catch(() => {
            checkLoad();
            const item = platformOptions?.find((it) => it.key === key);
            if (item) {
              item.money = 0.0;
              item.isLoad = false;
              setPlatformOptions([...platformOptions]);
            }
          });
      });
    }
  }, [checkLoad, platformOptions]);

  useEffect(() => {
    if (platformOptions) {
      if (!init.current) {
        init.current = true;
        getAccountBalance();
        getYebInfo()
          .then((res: any) => {
            if (res.Data) {
              setYebBalance(res.Data.Total);
            }
          })
          .catch(() => {});
      }
      return;
    }
    getPlatformOptions()
      .then((res: any) => {
        if (res.Code === 210 && res.Data && res.Data.length) {
          setPlatformOptions([
            ...res.Data.map((it, i) => ({
              value: i + 1,
              htValue: it.Value,
              key: it.Key === '主账户' ? 'Main' : it.Key,
              text: it.Expand,
              money: 0.0,
              isLoad: true,
            })),
          ]);
        }
      })
      .catch(() => {
        toastText(`${formatMsg('failData')}`);
      });
  }, [getAccountBalance, platformOptions, formatMsg]);

  // 设置免密
  const setSecret = useCallback(
    (_, resolve, reject) => {
      if (!checkRef.current && secretStatus !== null) {
        checkRef.current = true;
        changeState('isLoading', true);
        setAvoidSecret()
          .then((res: any) => {
            if (res.Code === 210 && res.Data) {
              setSecretStatus(res.Data);
            }
            checkRef.current = false;
            resolve && resolve();
          })
          .catch(() => {
            checkRef.current = false;
            setSecretStatus(false);
            reject && reject();
          })
          .finally(() => {
            changeState('isLoading', false);
          });
      } else {
        resolve && resolve();
      }
    },
    [changeState, secretStatus]
  );

  /**
   * @description: 刷新余额
   * @param {*} useCallback
   * @return {*}
   */
  const refreshBalance = useCallback(() => {
    if (!isRefresh.current) {
      if (platformOptions) {
        for (let index = 0; index < platformOptions.length; index += 1) {
          const element = platformOptions[index];
          element.isLoad = true;
        }
        setPlatformOptions([...platformOptions]);
        getAccountBalance();
      }
    }
  }, [getAccountBalance, platformOptions]);

  /**
   * @description: 获取全部余额
   * @param {*} useCallback
   * @return {*}
   */
  const getAllBalance = useCallback(() => {
    const lv = form.getFieldValue('leftName');
    if (platformOptions) {
      const item = platformOptions.find((it) => it.value === lv[0].value);
      form.setFieldsValue({ money: item.money });
    }
  }, [form, platformOptions]);

  //交换位置
  const swapVal = useCallback(() => {
    const lv = form.getFieldValue('leftName');
    const rv = form.getFieldValue('rightName');
    if (lv && rv) {
      form.setFieldsValue({ leftName: rv, rightName: lv });
    }
  }, [form]);

  const chooseLeft = useCallback(
    (item) => {
      const rv = form.getFieldValue('rightName');
      if (item[0].text === rv[0].text) {
        disableRef.current = true;
      } else {
        disableRef.current = false;
      }
    },
    [form]
  );

  const chooseRight = useCallback(
    (item) => {
      const lv = form.getFieldValue('leftName');
      if (item[0].text === lv[0].text) {
        disableRef.current = true;
      } else {
        disableRef.current = false;
      }
    },
    [form]
  );

  const rechargeClick = useCallback(() => {
    navigate('/recharge');
  }, [navigate]);

  return (
    <>
      {/* 顶部两个按钮 */}
      <div className='d-f fd-c'>
        <Cell
          title={
            <div className='text d-f fd-r'>
              <span>{formatMsg('MasterAccountBalance')}</span>
              <div className={`${styles['refresh']} br-10 m-l-20 ta-c wds-con`}>
                <div className='color-primary' onClick={refreshBalance}>
                  {formatMsg('refresh')}
                </div>
              </div>
            </div>
          }
          dividerFull
          rightDesc={`￥${formatDigit(mainBalance)}`}
        />
        <Cell
          href='/mine/yueBao'
          title={
            <div className='text d-f fd-r'>
              <span>{formatMsg('yuerbao')}</span>
              <div className='br-10 m-l-20 ta-c wds-sm-title'>
                <span className='color-primary'>
                  {formatMsg('rollInrollOut')}
                </span>
              </div>
            </div>
          }
          rightDesc={`￥${formatDigit(yebBalance)}`}
          isDivider={false}
        />
      </div>
      {/* 中间转换模块 */}
      <CellGroup className={`${styles['top-border']} m-t-30`}>
        <Cell
          className='br-30'
          title={formatMsg('PurseFreeTransfer')}
          dividerFull
          rightSolt={
            <div className='m-0-50'>
              <Switch isCheck={secretStatus} isPromise onClick={setSecret} />
            </div>
          }
        />
        {/* {!token ? (
          <Empty description='暂无可用钱包' imageSize={50} />
        ) : ( */}
        <div className={`${styles['bx-grid']}`}>
          {platformOptions?.map((item, i) => (
            <div
              key={item.value || i}
              className={`${styles['grid-border']} d-f fd-r jc-sb ai-c h-150`}
            >
              <div className='wds-sm-title m-l-20'>{item.text}</div>
              <div className='wds-sm-title m-r-20'>
                {item.isLoad ? (
                  <Icon name='loading' />
                ) : (
                  formatDigit(item.money)
                )}
              </div>
            </div>
          ))}
          {platformOptions?.length !== 0 &&
          platformOptions?.length % 2 !== 0 ? (
            <div
              className={`${styles['grid-border']} d-f fd-r jc-sb ai-c h-150 flex-1`}
            />
          ) : (
            ''
          )}
        </div>
        {/* )} */}
      </CellGroup>

      {/* 转换操作 */}
      <CellGroup className='m-t-30 br-30 m-0-50'>
        {/* 选择转换 */}
        <Form className='br-30 p-0' form={form}>
          <div className='d-f fd-r jc-sa br-30 ta-c ai-c h-150'>
            <FormItem noStyle name='leftName' initialValue={leftDefault}>
              <Picker
                labelClassName='w-280'
                listData={platformOptions || []}
                onConfirm={chooseLeft}
              />
            </FormItem>
            <Img
              className='icon-side-86'
              src='/mine/icon_geren_007.png'
              onClick={swapVal}
            />
            <FormItem noStyle name='rightName' initialValue={rightDefault}>
              <Picker
                labelClassName='w-280'
                listData={platformOptions || []}
                onConfirm={chooseRight}
              />
            </FormItem>
          </div>
          <FormItem
            noStyle
            name='money'
            classname='bg-tip d-f jc-sb flex-1 ai-c h-102 br-b-l-30 br-b-r-30'
          >
            <Input
              afterfix={
                <div
                  className='color-primary wds-sm-title m-r-30 w-100'
                  onClick={getAllBalance}
                >
                  {formatMsg('all')}
                </div>
              }
              type='number'
              className='bg-tip w-540'
              placeholder={formatMsg('transoformMoney')}
            />
          </FormItem>
        </Form>
      </CellGroup>

      {/* 开始转换 */}
      <div className='m-0-50 p-30'>
        <Button
          className='w-full'
          type='primary'
          size='large'
          isPromise
          onClick={handleSubmit}
        >
          {formatMsg('startTransform')}
        </Button>
      </div>
      {/* 一键归集 */}
      <div className='d-f fd-r jc-sa p-0-30'>
        <Button
          className={`${styles['btn-font-size']} m-0-50`}
          type='link'
          isPromise
          onClick={transferAllBalance}
        >
          {formatMsg('oneClickCollection')}
        </Button>
        <Button
          className={`${styles['btn-font-size']} m-0-50`}
          type='link'
          onClick={rechargeClick}
        >
          {formatMsg('pay')}
        </Button>
      </div>
    </>
  );
};

export default QuotaConvert;
