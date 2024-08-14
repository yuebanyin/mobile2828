import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useGlobalStore, useUserScoreStore } from '@/mobx';
import { BgImg, Img, OutLink, Button, Icon, toastText } from '@/components';
import mergeBg from '@/assets/image/games/turntable/merge_bg.png';
import falseBg from '@/assets/image/games/turntable/false_sm.png';
import trueSm from '@/assets/image/games/turntable/true_sm.png';
import trueMid from '@/assets/image/games/turntable/true_mid.png';
import pointer from '@/assets/image/games/turntable/pointer2.png';
// import rotateimg from '@/assets/image/games/turntable/rotate11.png';
import rotateimg from '@/assets/image/games/turntable/noNumber.png';
import rules from '@/assets/image/games/turntable/rules.png';
import reward from '@/assets/image/games/turntable/reward.png';
import yellowBtn from '@/assets/image/games/turntable/yellow_btn.png';
import blueBtn from '@/assets/image/games/turntable/blue_btn.png';
import styles from './index.module.scss';
import { getDrawLottery, getLotterySetting } from '@/services';
import { useNavigation, useLanguage } from '@/hooks';

// 抽奖按钮text
const btnList = [
  { id: 1, text: 'shake1time', active: true },
  { id: 5, text: 'shake5time', active: false },
  { id: 10, text: 'shake10time', active: false },
  { id: 15, text: 'shake15time', active: false },
];

const DrawLottery = observer(() => {
  const navigate = useNavigation();
  const { formatMsg } = useLanguage();
  const { bindScore, changeUserIntegral } = useUserScoreStore();
  const [btnData, setBtnData] = useState({ btnArr: [], activeId: null });
  const { changeState } = useGlobalStore();
  const [transform, setTransform] = useState({
    transform: 0,
    transition: '3s cubic-bezier(.25,.93,.43,1)',
  }); // 初始化转盘动画
  const [lotteryScore, setLotteryScore] = useState(); // 摇奖  分数/次
  const [lotterySetting, setLotterySetting] = useState([]); // 摇奖奖项配置
  const [showMask, setShowMask] = useState('d-n');
  const [popBg, setPopBg] = useState({ img: 'true_mid', popCon: null }); //false_sm ,true_mid, true_sm

  const isButtonDisabledRef = useRef(false); // 防止按钮重复点击触发

  const angle = 360 / lotterySetting.length; // 计算每个数字之间的角度间隔
  const radius = 100; // 设置半径

  // 获取转盘初始化数据
  useEffect(() => {
    changeState('isLoading', true);
    getLotterySetting()
      .then((res: any) => {
        if (res?.Data) {
          setLotteryScore(res.Data?.NeedScore);
          setLotterySetting(res.Data?.Setting);
          console.log(res?.Data);
        }
      })
      .catch(() => {})
      .finally(() => {
        changeState('isLoading', false);
      });
  }, [changeState]);

  // 得到转盘抽奖结果 格式化
  const getRotateScore = (Id: number) => {
    getDrawLottery({ Id })
      .then((res: any) => {
        console.log(res?.Data);
        if (res?.Data) {
          // 求出需要旋转的角度  初始3960deg 1:-30deg
          const rotateCls = lotterySetting.indexOf(
            res?.Data?.DrawLotteryResult.slice(-1)[0]
          );
          // 上一把旋转的余数
          const remain = transform.transform % 360;
          // 更新当下旋转角度
          setTransform({
            ...transform,
            transform: transform.transform + 3960 - angle * rotateCls - remain,
          });

          // 更新mobx用户的积分
          changeUserIntegral(res?.Data?.Balance);
          if (
            res?.Data?.DrawLotteryResult.length === 1 &&
            res?.Data?.DrawLotteryResult[0] === 0
          ) {
            setPopBg({ img: 'false_sm', popCon: null });
          } else if (
            res?.Data?.DrawLotteryResult.length === 1 &&
            res?.Data?.DrawLotteryResult[0] !== 0
          ) {
            setPopBg({
              img: 'true_sm',
              popCon: res?.Data?.DrawLotteryResult[0],
            });
          } else if (res?.Data?.DrawLotteryResult.length > 1) {
            const list = res?.Data?.DrawLotteryResult;
            const newList = list.map((item, i) => ({
              id: i,
              con:
                item !== 0
                  ? formatMsg('CongratulatOnGet')
                  : formatMsg('Unfortunately'),
              val: item !== 0 ? item : formatMsg('notWin'),
              isLuck: item !== 0,
            }));
            setPopBg({ img: 'true_mid', popCon: newList });
          }
        }
      })
      .catch(() => {});
  };

  /**
   * 旋转的标准：1，5，10，15
   * @param num 转的圈数
   * @param time 旋转时间
   * @param cls 转圈动画类名
   *
   */

  const rotateCom = async (num, time) => {
    if (num * Number(lotteryScore) > bindScore) {
      toastText(`${formatMsg('SDB-BS-DRAW-3')}`);
    } else if (!isButtonDisabledRef.current) {
      getRotateScore(btnData?.activeId);

      // 在处理点击逻辑时将按钮状态设置为已禁用
      isButtonDisabledRef.current = true;
      setTimeout(() => {
        setShowMask('');
        isButtonDisabledRef.current = false;
      }, time);
    }
  };

  //点击开始摇奖
  const handleClickRotate = () => {
    // getRotateScore(btnData?.activeId);
    switch (btnData.activeId) {
      case 1:
        rotateCom(1, 4000);
        break;
      case 5:
        rotateCom(5, 4000);
        break;
      case 10:
        rotateCom(10, 4000);
        break;
      case 15:
        rotateCom(15, 4000);
        break;
      default:
        break;
    }
  };

  // 点击选择连摇按钮
  const handleClickBtn = (item) => {
    // 禁止按钮重复点击触发
    if (isButtonDisabledRef.current) {
      return;
    }

    if (item.id === btnData.activeId) {
      return;
    }
    // 更新选中按钮
    if (item.id !== btnData.activeId) {
      const newList = [...btnData.btnArr].map((it) => {
        if (it.id === item.id) {
          return { ...item, active: true };
        }
        return { ...it, active: false };
      });
      setBtnData({ btnArr: newList, activeId: item.id });
    }
  };

  //得到图片背景
  const getPopBg = useMemo(() => {
    if (popBg.img === 'false_sm') {
      return falseBg;
    }
    if (popBg.img === 'true_sm') {
      return trueSm;
    }
    if (popBg.img === 'true_mid') {
      return trueMid;
    }
    return popBg.img;
  }, [popBg.img]);

  // 关闭弹窗
  const handleCloseMask = () => {
    setShowMask('d-n');
  };

  // href='/mine/about/detail?title=摇奖规则'
  const handleGameRule = () => {
    navigate(`/mine/about/detail?title=${formatMsg('lotteryRules')}`, {
      state: { id: 22 },
    });
  };

  useEffect(() => {
    if (btnList) {
      setBtnData({ btnArr: btnList, activeId: 1 });
    }
  }, []);

  return (
    <div className={`${styles['drawMain']} p-r h-full o-y`}>
      <div className='h-full w-full o-none'>
        <Img isNoTheme className='p-r w-full' src={mergeBg} />
      </div>
      <div className={styles['text-block']}>
        <div className={styles['title']}>{formatMsg('CurrentPoints')}:</div>
        <div className={styles['integral']}>{bindScore || 0}</div>
        <div className={styles['tips']}>
          {`(${lotteryScore || 5}${formatMsg('Points/time')})`}
        </div>
      </div>

      <div className={`${styles['small']} p-a top-0`}>
        <Img
          className={`${styles['rotate']}`}
          isNoTheme
          src={rotateimg}
          style={{
            transform: `rotate(${transform?.transform}deg)`,
            transition: transform.transition,
          }}
        />

        <div
          className={`${styles['number-container']}`}
          style={{
            transform: `rotate(${transform?.transform}deg)`,
            transition: transform.transition,
          }}
        >
          {lotterySetting.map((item, index) => {
            const rotation = angle * index; // 计算当前数字的旋转角度
            const x = Math.cos(((rotation - 90) * Math.PI) / 180) * radius;
            const y = Math.sin(((rotation - 90) * Math.PI) / 180) * radius;
            const transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`; // 应用位移和旋转
            return (
              <span
                key={Math.random() * 1}
                className={`${styles['number']} color-red`}
                style={{ transform }}
              >
                {item || formatMsg('keepItup')}
              </span>
            );
          })}
        </div>
        <Img
          className={`${styles['pointer']}`}
          isNoTheme
          src={pointer}
          onClick={handleClickRotate}
        />

        <div className={`${styles['btn']}`}>
          {btnData.btnArr.map((item) => (
            <div key={item.text} onClick={() => handleClickBtn(item)}>
              <div
                className={`${styles['btn-text']} ${
                  item.active ? styles['btn-text-active'] : ''
                }`}
              >
                {formatMsg(item.text)}
              </div>
              <Img
                className={styles['btn-item']}
                isNoTheme
                src={`${item.active ? yellowBtn : blueBtn}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles['enter']} p-a bottom-0`}>
        <div onClick={handleGameRule}>
          <Img className={styles['rule']} isNoTheme src={rules} />
        </div>
        <OutLink href='/mine/reward'>
          <Img className={styles['reward']} isNoTheme src={reward} />
        </OutLink>
      </div>
      {/* 以下是弹窗抽奖结果 */}
      <div className={`${styles['pop-modle']} p-a top-0 ${showMask}`}>
        <BgImg
          isNoTheme
          url={getPopBg}
          className={`${
            popBg.img === 'true_mid' ? styles['pop-big'] : styles['pop-sm']
          } img-size`}
        >
          {popBg.img !== 'true_mid' ? (
            <div className={styles['content']}>
              {popBg.popCon ? (
                <div>
                  <div className={styles['true-text']}>
                    {formatMsg('CongratulatOnGet')}
                  </div>
                  <div className={`${styles['true-money']} m-t-15`}>
                    {popBg.popCon}
                  </div>
                </div>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <div className={styles['box']}>
              {popBg?.popCon?.map((item) => (
                <div className={styles['line']} key={item.id}>
                  <div>
                    {formatMsg('di')}
                    <span className={styles['times']}>{`${item.id + 1}`}</span>
                    {formatMsg('bout')}
                  </div>
                  <div className={styles['text']}>{item.con}</div>
                  <div
                    className={`${
                      item.isLuck ? styles['value'] : 'color-primary'
                    }`}
                  >
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={styles['btn-line']}>
            <Button className={styles['pop-btn']} onClick={handleCloseMask}>
              <Icon
                name='close'
                color='#fff'
                className={styles['close-icon']}
              />
            </Button>
          </div>
        </BgImg>
      </div>
    </div>
  );
});

export default memo(DrawLottery);
