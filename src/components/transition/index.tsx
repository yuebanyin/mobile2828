import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
import { forwardRef } from 'react';
import { BaseReactHtml } from '@/constants';

interface CTransitionProps extends BaseReactHtml {
  appear?: boolean;
  in?: boolean;
  timeout?: number;
  unmountOnExit?: boolean;
  onExited?: Function;
  classNames?: string;
}
export function CTransition(props: CTransitionProps) {
  const { children, ...rest } = props;
  return (
    // <TransitionGroup appear enter exit>
    <CSSTransition appear timeout={300} unmountOnExit classNames='bx-right' {...rest}>
      {children}
    </CSSTransition>
    // </TransitionGroup>
  );
}

interface STransitionProps extends BaseReactHtml {
  mode?: 'in-out' | 'out-in';
}

export function STransition(props: STransitionProps) {
  const { children, ...rest } = props;
  return (
    <SwitchTransition mode='in-out' {...rest}>
      {children}
    </SwitchTransition>
  );
}

interface GTransitionProps extends BaseReactHtml {}

export const GTransition = forwardRef((props: GTransitionProps, ref) => {
  const { children, ...rest } = props;
  return (
    <TransitionGroup ref={ref as any} {...rest}>
      {children}
    </TransitionGroup>
  );
});
