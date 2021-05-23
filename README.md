# reanimated-drag-resize
Draggable and Resizable React Native Component running at 60FPS using React Native Reanimated v2

[![NPM](https://nodei.co/npm/reanimated-drag-resize.png?downloads=true)](https://nodei.co/npm/reanimated-drag-resize/)


![Demo](https://i.ibb.co/c30NjMn/reanimated-drag-resize-demo.gif)


# Main Dependencies

 - react-native-reanimated v2
 - react-native-gesture-handler

# Import

    ```
    import Drag from 'reanimated-drag-resize';
    ```

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
