import React, { PureComponent } from 'react';
import { PullToRefresh } from 'antd-mobile';
import throttle from 'lodash/throttle';

export interface Props {
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
  children: React.ReactNode;
}

interface State {
  refreshing: boolean;
  down: boolean;
}

class ScrollView extends PureComponent<Props, State> {
  scrolling: boolean;
  scrollStartTop: number = 0;
  scrollEndTimer: number;
  refreshingTimer: number;

  static defaultProps = {
    onEndReachedThreshold: 0.5,
    endReachedTime: 200,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      refreshing: false,
      down: true,
    };
    this.scrolling = false;
    this.scrollEndTimer = 0;
    this.refreshingTimer = 0;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    if (this.scrollEndTimer) {
      clearTimeout(this.scrollEndTimer);
    }
    if (this.refreshingTimer) {
      clearTimeout(this.refreshingTimer);
    }
    window.removeEventListener('scroll', this.handleScroll);
  }

  init() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    if (scrollTop || scrollTop === 0) {
      const {
        onScrollStart,
        onScroll,
        onScrollEnd,
        onEndReachedThreshold,
      } = this.props;
      if (!this.scrolling) {
        this.scrolling = true;
        this.scrollStartTop = scrollTop;
        onScrollStart && onScrollStart(scrollTop);
      }
      onScroll && onScroll(scrollTop);
      // 下拉刷新条件判断
      const clientHeight = window.innerHeight;
      // 模拟scrollEnd触发条件
      clearTimeout(this.scrollEndTimer);
      this.scrollEndTimer = window.setTimeout(() => {
        if (this.scrolling) {
          onScrollEnd && onScrollEnd(scrollTop);
          this.scrolling = false;
          if (scrollTop > this.scrollStartTop) {
            const scrollHeight =
              document.documentElement.scrollHeight > clientHeight
                ? document.documentElement.scrollHeight
                : document.body.scrollHeight;
            if (
              scrollTop + clientHeight + onEndReachedThreshold * clientHeight >
              scrollHeight
            ) {
              this.handleEndReached();
            }
          }
        }
      }, 300);
    }
  };

  handleEndReached = throttle(() => {
    this.props.onEndReached && this.props.onEndReached();
  }, this.props.endReachedTime);

  handleRefresh = () => {
    this.props.onRefresh && this.props.onRefresh();
    if (this.props.refreshing === undefined) {
      this.setState({ refreshing: true });
      this.refreshingTimer = window.setTimeout(() => {
        this.setState({ refreshing: false });
      }, 1000);
    }
  };

  render() {
    const { children, refreshing, onRefresh } = this.props;
    return onRefresh ? (
      <PullToRefresh
        damping={60}
        style={{
          minHeight: '100%',
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={
          refreshing !== undefined ? refreshing : this.state.refreshing
        }
        onRefresh={this.handleRefresh}
        getScrollContainer={() => document.body}
        distanceToRefresh={25}
      >
        {children}
      </PullToRefresh>
    ) : (
      children
    );
  }
}

export default ScrollView;
