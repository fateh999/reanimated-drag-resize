# reanimated-drag-resize

Draggable and Resizable React Native Component running at 60FPS using React Native Reanimated v2

[![npm downloads](https://img.shields.io/npm/dm/reanimated-drag-resize.svg?style=for-the-badge)](https://www.npmjs.com/package/reanimated-drag-resize)
[![npm](https://img.shields.io/npm/dt/reanimated-drag-resize.svg?style=for-the-badge)](https://www.npmjs.com/package/reanimated-drag-resize)
[![npm](https://img.shields.io/npm/l/reanimated-drag-resize?style=for-the-badge)](https://github.com/fateh999/reanimated-drag-resize/blob/master/LICENSE)

![Demo](https://i.ibb.co/c30NjMn/reanimated-drag-resize-demo.gif)

## Main Dependencies

- react-native-reanimated v2
- react-native-gesture-handler

## Import

    import Drag from 'reanimated-drag-resize';

## Usage

```jsx
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Drag from "./src/Drag";

const generateRandomColor = () => {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
};

const DATA_ARRAY = [
  {
    name: "Box 1",
    color: generateRandomColor(),
    x: 20,
    y: 20,
    height: 100,
    width: 100,
  },
  {
    name: "Box 2",
    color: generateRandomColor(),
    x: 80,
    y: 180,
    height: 100,
    width: 100,
  },
  {
    name: "Box 3",
    color: generateRandomColor(),
    x: 40,
    y: 410,
    height: 100,
    width: 100,
  },
];

function App() {
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [boxArray, setBoxArray] = useState(DATA_ARRAY);

  return (
    <SafeAreaView style={styles.container}>
      <View
        onLayout={(ev) => {
          const layout = ev.nativeEvent.layout;
          setLimitationHeight(layout.height);
          setLimitationWidth(layout.width);
        }}
        style={styles.boxContainer}
      >
        {boxArray
          .filter((_) => limitationHeight > 0 && limitationWidth > 0)
          .map(({ color, name, x, y, height, width }, index) => (
            <Drag
              key={index}
              height={height}
              width={width}
              x={x}
              y={y}
              limitationHeight={limitationHeight}
              limitationWidth={limitationWidth}
              onDragEnd={(boxPosition) => {
                const _boxArray = [...boxArray];
                const _box = _boxArray[index];
                _boxArray[index] = {
                  ..._box,
                  x: boxPosition.x,
                  y: boxPosition.y,
                  height: boxPosition.height,
                  width: boxPosition.width,
                };
                setBoxArray(_boxArray);
              }}
              onResizeEnd={(boxPosition) => {
                const _boxArray = [...boxArray];
                const _box = _boxArray[index];
                _boxArray[index] = {
                  ..._box,
                  x: boxPosition.x,
                  y: boxPosition.y,
                  height: boxPosition.height,
                  width: boxPosition.width,
                };
                setBoxArray(_boxArray);
              }}
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  styles.box,
                  {
                    backgroundColor: color,
                  },
                ]}
              >
                <Text>{name}</Text>
              </View>
            </Drag>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxContainer: {
    flex: 1,
    margin: 40,
    backgroundColor: "lightblue",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
});
```

## Props

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
