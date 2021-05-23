# reanimated-drag-resize

Draggable and Resizable React Native Component running at 60FPS using React Native Reanimated v2

![Demo](https://i.ibb.co/wJBJn3f/May-23-2021-05-48-40.gif)

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
