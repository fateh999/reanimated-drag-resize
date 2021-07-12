# reanimated-drag-resize

Draggable and Resizable React Native Component running at 60FPS using React Native Reanimated v2

[![npm downloads](https://img.shields.io/npm/dm/reanimated-drag-resize.svg?style=for-the-badge)](https://www.npmjs.com/package/reanimated-drag-resize)
[![npm](https://img.shields.io/npm/dt/reanimated-drag-resize.svg?style=for-the-badge)](https://www.npmjs.com/package/reanimated-drag-resize)
[![npm](https://img.shields.io/npm/l/reanimated-drag-resize?style=for-the-badge)](https://github.com/fateh999/reanimated-drag-resize/blob/master/LICENSE)

![Demo](https://i.ibb.co/c30NjMn/reanimated-drag-resize-demo.gif)

# Main Dependencies

- react-native-reanimated v2
- react-native-gesture-handler

# Import

    import Drag from 'reanimated-drag-resize';

# Usage

Check Example folder from repo

# Props

```
type  DragProps = {

x: number;

y: number;

limitationHeight: number;

limitationWidth: number;

height?: number;

width?: number;

minHeight?: number;

minWidth?: number;

onDragEnd: (response: Response) =>  void;

onResizeEnd: (response: Response) =>  void;

children: any;

resizable?: boolean;

draggable?: boolean;

resizerImageSource?: ImageSourcePropType;

};


type  Response = {

x: number;

y: number;

width: number;

height: number;

};
```
