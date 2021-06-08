import React, { useEffect, useMemo, useRef } from "react";
import { I18nManager, Image, StyleSheet, } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";
const clamp = (value, lowerBound, upperBound) => {
    "worklet";
    return Math.min(Math.max(lowerBound, value), upperBound);
};
function Drag(props) {
    const { x, y, limitationHeight, limitationWidth, height = 100, width = 100, minHeight = height / 2, minWidth = width / 2, onDragEnd, onResizeEnd, children, resizable = true, draggable = true, resizerImageSource = require("./resize.png"), style, } = props;
    const xRef = useRef(x);
    const yRef = useRef(y);
    const heightRef = useRef(height);
    const widthRef = useRef(width);
    const boxX = useSharedValue(0);
    const boxY = useSharedValue(0);
    const boxHeight = useSharedValue(heightRef.current ?? 100);
    const boxWidth = useSharedValue(widthRef.current ?? 100);
    useEffect(() => {
        boxX.value = withTiming(xRef.current);
        boxY.value = withTiming(yRef.current);
    }, [boxX, boxY]);
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            ctx.offsetX = boxX.value;
            ctx.offsetY = boxY.value;
        },
        onActive: (ev, ctx) => {
            if (!draggable) {
                return;
            }
            boxX.value = clamp(ctx.offsetX + ev.translationX, 0, limitationWidth - boxWidth.value);
            boxY.value = clamp(ctx.offsetY + ev.translationY, 0, limitationHeight - boxHeight.value);
        },
        onFinish: () => {
            if (onDragEnd) {
                runOnJS(onDragEnd)({
                    x: boxX.value,
                    y: boxY.value,
                    height: boxHeight.value,
                    width: boxWidth.value,
                });
            }
        },
    });
    const resizeHandler = useAnimatedGestureHandler({
        onStart: (_ev, ctx) => {
            ctx.boxWidth = boxWidth.value;
            ctx.boxHeight = boxHeight.value;
            ctx.offsetX = boxX.value;
            ctx.offsetY = boxY.value;
        },
        onActive: (ev, ctx) => {
            if (!resizable) {
                return;
            }
            boxWidth.value = clamp(ctx.boxWidth + ev.translationX, minWidth, limitationWidth - boxX.value);
            boxHeight.value = clamp(ctx.boxHeight + ev.translationY, minHeight, limitationHeight - boxY.value);
        },
        onFinish: () => {
            "worklet";
            if (onResizeEnd) {
                runOnJS(onResizeEnd)({
                    x: boxX.value,
                    y: boxY.value,
                    height: boxHeight.value,
                    width: boxWidth.value,
                });
            }
        },
    });
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: boxX.value,
            },
            {
                translateY: boxY.value,
            },
        ],
        height: boxHeight.value,
        width: boxWidth.value,
        position: "absolute",
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    }));
    const styles = useMemo(() => StyleSheet.create({
        resizeBoxStyle: {
            position: "absolute",
            zIndex: 1,
            right: -28 / 4,
            bottom: -28 / 4,
        },
        imageStyle: {
            height: 28,
            width: 28,
        },
    }), []);
    return (<PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[animatedStyle, style]}>
        <PanGestureHandler onGestureEvent={resizeHandler}>
          <Animated.View style={styles.resizeBoxStyle}>
            <Image source={resizerImageSource} style={styles.imageStyle} resizeMode={"contain"}/>
          </Animated.View>
        </PanGestureHandler>
        {children}
      </Animated.View>
    </PanGestureHandler>);
}
export default Drag;
