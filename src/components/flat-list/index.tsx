import React, { Fragment } from 'react';
import ScrollView from '../scroll-view';
import { FlatListProps } from './types';

function FlatList<ItemT>(props: FlatListProps<ItemT>) {
  const {
    data,
    renderItem,
    ItemSeparatorComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponent,
    keyExtractor,
    ...otherProps
  } = props;
  return (
    <ScrollView {...otherProps}>
      {ListHeaderComponent}
      {data && data.length > 0
        ? data.map((item, index) => {
            const key = keyExtractor ? keyExtractor(item, index) : index;
            return (
              <Fragment key={key}>
                {index !== 0 ? ItemSeparatorComponent : null}
                {renderItem({ item, index })}
              </Fragment>
            );
          })
        : ListEmptyComponent}
      {ListFooterComponent}
    </ScrollView>
  );
}

export default FlatList;
