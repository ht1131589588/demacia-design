import React from 'react';
import { ScrollView } from 'demacia-design';

export default () => (
  <ScrollView
    onScrollStart={scrollTop => {
      console.log('滚动开始--------, 当前滚动高度', scrollTop);
    }}
    onScrollEnd={scrollTop => {
      console.log('滚动结束--------, 当前滚动高度', scrollTop);
    }}
    onEndReached={() => {
      console.log('加载更多--------, 当前滚动高度');
    }}
  >
    <h2 style={{ paddingBottom: 8 }}>ScrollView</h2>
    <div
      style={{
        height: 2000,
        width: '3.6rem',
        background: '#ff9c6e',
      }}
    >
      控制台中可以看到滚动中暴露的一些事件
    </div>
  </ScrollView>
);
