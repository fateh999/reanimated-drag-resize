import React, {useState} from 'react';
import {I18nManager, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Switch} from 'react-native-gesture-handler';
import Drag from './src/Drag';
//@ts-ignore
import RNRestart from 'react-native-restart';

const generateRandomColor = () => {
  return 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
};

const DATA_ARRAY = [
  {
    name: 'Box 1',
    color: generateRandomColor(),
    x: 20,
    y: 20,
    height: 100,
    width: 100,
  },
  {
    name: 'Box 2',
    color: generateRandomColor(),
    x: 80,
    y: 180,
    height: 100,
    width: 100,
  },
  {
    name: 'Box 3',
    color: generateRandomColor(),
    x: 40,
    y: 410,
    height: 100,
    width: 100,
  },
];

function App() {
  const [rtl] = useState(I18nManager.isRTL);
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [boxArray, setBoxArray] = useState(DATA_ARRAY);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text>RTL </Text>
        <Switch
          value={rtl}
          onValueChange={() => {
            I18nManager.forceRTL(!rtl);
            RNRestart.Restart();
          }}
        />
      </View>
      <View
        onLayout={ev => {
          const layout = ev.nativeEvent.layout;
          setLimitationHeight(layout.height);
          setLimitationWidth(layout.width);
        }}
        style={styles.boxContainer}>
        {boxArray
          .filter(_ => limitationHeight > 0 && limitationWidth > 0)
          .map(({color, name, x, y, height, width}, index) => (
            <Drag
              key={index}
              height={height}
              width={width}
              x={x}
              y={y}
              limitationHeight={limitationHeight}
              limitationWidth={limitationWidth}
              onDragEnd={boxPosition => {
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
              onResizeEnd={boxPosition => {
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
              }}>
              <View
                style={[
                  StyleSheet.absoluteFill,
                  styles.box,
                  {
                    backgroundColor: color,
                  },
                ]}>
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
  sliderContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainer: {
    flex: 1,
    margin: 40,
    backgroundColor: 'lightblue',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});
