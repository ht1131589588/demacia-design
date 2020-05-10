import React from 'react';
import { FlatList } from 'demacia-design';

const data = Array.from({ length: 50 }, (_, index) => ({
  id: 10000 + index,
  name: 'hello' + (index + 1),
}));
export default () => (
  <FlatList
    data={data}
    renderItem={({ item, index }) => {
      return (
        <div>
          {index} - {item.name}
        </div>
      );
    }}
    ItemSeparatorComponent={
      <div style={{ margin: 8, height: 1, backgroundColor: 'red' }}></div>
    }
    keyExtractor={item => item.id}
    ListHeaderComponent={
      <div style={{ lineHeight: '50px', backgroundColor: '#d6e7f7' }}>
        列表头
      </div>
    }
    ListFooterComponent={
      <div style={{ lineHeight: '50px', backgroundColor: '#d6e7f7' }}>
        列表尾
      </div>
    }
    ListEmptyComponent={<div>空数据</div>}
    onScrollStart={scrollTop => {
      console.log('滚动开始--------, 当前滚动高度', scrollTop);
    }}
    onScrollEnd={scrollTop => {
      console.log('滚动结束--------, 当前滚动高度', scrollTop);
    }}
    onEndReached={() => {
      console.log('加载更多--------, 当前滚动高度');
    }}
  />
);
