import React from 'react';
export interface ListRenderItemInfo<ItemT> {
  item: ItemT;

  index: number;
}

export type ListRenderItem<ItemT> = (
  info: ListRenderItemInfo<ItemT>,
) => React.ReactNode;

export interface FlatListProps<ItemT> {
  /**
   * 列表展示数据
   */
  data: ReadonlyArray<ItemT> | null;
  /**
   * 从data中挨个取出数据并渲染到列表中
   */
  renderItem: ListRenderItem<ItemT>;
  /**
   * 行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后
   */
  ItemSeparatorComponent?: React.ReactNode;
  /**
   * 列表为空时渲染该组件
   */
  ListEmptyComponent?: React.ReactNode;
  /**
   * 尾部组件
   */
  ListFooterComponent?: React.ReactNode;
  /**
   * 头部组件
   */
  ListHeaderComponent?: React.ReactNode;
  /**
   * 此函数用于为给定的 item 生成一个不重复的 key
   */
  keyExtractor?: (item: ItemT, index: number) => string;
  /**
   * 滚动中
   */
  onScroll?: (scrollTop: number) => void | null;
  /**
   * 滚动开始
   */
  onScrollStart?: (scrollTop: number) => void | null;
  /**
   * 滚动结束
   */
  onScrollEnd?: (scrollTop: number) => void | null;
  /**
   * 如果设置了此选项，则会在列表头部添加一个标准的RefreshControl控件，以便实现“下拉刷新”的功能
   */
  onRefresh?: (() => void) | null;
  /**
   * 当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
   */
  onEndReached?: (() => void) | null;
  /**
   * 决定当距离内容最底部还有多远时触发onEndReached回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。
   */
  onEndReachedThreshold: number;
  /**
   * 下拉刷新时，在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的Icon。
   */
  refreshing?: boolean;
  /**
   * onEndReached的节流时间设置，单位ms
   */
  endReachedTime: number;
}
