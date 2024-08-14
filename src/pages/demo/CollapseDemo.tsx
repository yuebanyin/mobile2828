import { Collapse, CollapseItem, Iframe } from '@/components';

function CollapseDemo() {
  return (
    <div>
      <Collapse activeName='1'>
        <CollapseItem name='1' subTitle='2022-23-23' title='nihao'>
          <Iframe src='https://news.yindnf.com/3324B37A1AAC749.html%5C' />
        </CollapseItem>
        <CollapseItem name='2' subTitle='2022-23-23' title='nihao'>
          <Iframe height='600' src='https://news.yindnf.com/3324675D5ABD211.html%5C' />
        </CollapseItem>
      </Collapse>
    </div>
  );
}

export default CollapseDemo;
