/**
 * @description 支持表情包输入的输入框组件
 * @className 样式
 * @content 输入框的内容
 */

import {
 memo, useRef, forwardRef, useImperativeHandle, useEffect 
} from 'react';
import { BaseReactHtml } from '@/constants';
import styles from './index.module.scss';

interface EmojiInputProps extends BaseReactHtml {
  onChange?: Function;
}

const EmojiInput = forwardRef((props: EmojiInputProps, ref: any) => {
  const { className, onChange } = props;
  const divRef = useRef<HTMLDivElement | null>(null);
  // 当前选中的文字
  const curRangeRef = useRef<any>(null);

  useEffect(
    () => () => {
      if (curRangeRef?.current) {
        // 如果保留的有选择范围就置为空
        curRangeRef.current = null;
      }
    },
    []
  );

  // 失去焦点时记录光标的位置
  const handleBlur = () => {
    try {
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      curRangeRef.current = range;
    } catch (error) {
      console.log(error);
    }
  };

  // 获取焦点时的光标处理
  const handleFouces = () => {
    try {
      const sel = window.getSelection();
      if (curRangeRef.current) {
        // 如果记录的光标的位置就复位
        sel.removeAllRanges();
        sel.addRange(curRangeRef.current);
      } else {
        // 未记录位置，置光标到末尾
        sel.selectAllChildren(divRef.current);
        sel.collapseToEnd();
      }
    } catch (error) {
      console.info(error);
    }
  };

  // 输入事件
  const handleInput = (e, v, cb) => {
    try {
      if (divRef?.current) {
        const selection = window?.getSelection();
        if (curRangeRef?.current) {
          // 如果选中的不是输入框就清除
          while (curRangeRef.current.commonAncestorContainer?.parentNode?.id !== 'bx-emoji-ipt' && curRangeRef.current.commonAncestorContainer?.id !== 'bx-emoji-ipt') {
            selection.selectAllChildren(divRef.current);
            selection.collapseToEnd();
            console.log({ selection });
            const range = selection?.getRangeAt(0);
            curRangeRef.current = range;
          }
        } else {
          // 获取当前光标的位置
          const range = selection.getRangeAt(0);
          curRangeRef.current = range;
        }
        console.log('开始', curRangeRef.current);
        // 如果是选择图的时候
        let imgNode = null;
        if (!e && v?.key) {
          // emoji 处理
          imgNode = new Image();
          imgNode.crossOrigin = 'Anonymous';
          imgNode.style.display = 'inline-block';
          imgNode.className = styles['emoji-item-input'];
          imgNode.src = v.img;
          imgNode.alt = v.key;
          // 插入节点
          curRangeRef.current.insertNode(imgNode);
          // 设置光标的位置
          curRangeRef.current.setStartAfter(imgNode);
          curRangeRef.current.collapse(true);
          console.log('结束', curRangeRef.current);
          const sel = getSelection();
          sel.getRangeAt(0);
          sel.removeAllRanges();
          sel.addRange(curRangeRef.current);
          imgNode = null;
          typeof cb === 'function' && cb();
        } else if (divRef?.current?.childNodes?.length) {
          let v = '';
          for (let i = 0, len = divRef.current.childNodes.length; i < len; i += 1) {
            // 节点
            const el: any = divRef.current.childNodes[i];
            if (el.nodeName === '#text') {
              // 如果是文本节点
              v += el.nodeValue;
            } else {
              // emoji 节点
              v += `[_${el.alt}_]`;
            }
          }
          onChange(v);
        } else {
          onChange('');
        }
      }
    } catch (error) {
      console.info(error);
    }
  };

  // 抛出实例方法
  useImperativeHandle(ref, () => ({
    ipt: divRef.current,
    handleInput,
    handleFouces,
  }));

  // 粘贴的回调
  const handlePaste = (e) => {
    // 阻止默认事件
    e.preventDefault();
    try {
      if (divRef?.current) {
        const selection = window?.getSelection();
        // 获取当前光标的位置
        const range = selection.getRangeAt(0);
        curRangeRef.current = range;
        // 获取粘贴数据对象
        const clipboardData = e?.clipboardData || e?.originalEvent?.clipboardData || window?.clipboardData;
        // 获取粘贴的数据
        const pasteData = clipboardData?.getData('text/plain');
        let spanNode = document.createTextNode(pasteData);
        // 插入节点
        curRangeRef.current.insertNode(spanNode);
        // 设置光标的位置
        curRangeRef.current.setStartAfter(spanNode);
        curRangeRef.current.collapse(true);
        console.log('粘贴数据', curRangeRef.current);
        const sel = getSelection();
        sel.getRangeAt(0);
        sel.removeAllRanges();
        sel.addRange(curRangeRef.current);
        spanNode = null;
        let v = '';
        for (let i = 0, len = divRef.current.childNodes.length; i < len; i += 1) {
          // 节点
          const el: any = divRef.current.childNodes[i];
          if (el.nodeName === '#text') {
            // 如果是文本节点
            v += el.nodeValue;
          } else {
            // emoji 节点
            v += `[_${el.alt}_]`;
          }
        }
        onChange(v);
        console.log(v, divRef?.current?.childNodes);
      }
    } catch (error) {
      console.info(error);
    }
  };

  return (
    <div
      onBlur={handleBlur}
      onFocus={handleFouces}
      ref={divRef}
      id='bx-emoji-ipt'
      contentEditable
      onPaste={handlePaste}
      onInput={handleInput as any}
      suppressContentEditableWarning
      className={`${styles['emoji-box-input']} ${className} o-y p-r`}
    />
  );
});

export default memo(EmojiInput);
