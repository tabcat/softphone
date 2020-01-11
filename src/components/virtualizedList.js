
import React from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export default function VirtualizedList (props) {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          height={height}
          width={width}
          itemSize={props.itemSize}
          itemCount={props.itemCount}
        >
          {props.renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}
