/**
 * LazyComponent 解决r6 的element 不支持直接写lazy包裹后的变量问题
 * @param lazyChildren 真实的组件
 */
import { LazyExoticComponent, ComponentType, ReactElement } from 'react';

export const LazyImportComponent = (props: { lazyChildren: LazyExoticComponent<ComponentType<any>> | (() => ReactElement) }) => <props.lazyChildren />;

