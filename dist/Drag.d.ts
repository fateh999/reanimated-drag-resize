/// <reference types="react" />
import { ImageSourcePropType, ViewStyle } from "react-native";
export declare type Response = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare type DragProps = {
    x: number;
    y: number;
    limitationHeight: number;
    limitationWidth: number;
    height?: number;
    width?: number;
    minHeight?: number;
    minWidth?: number;
    onDragEnd: (response: Response) => void;
    onResizeEnd: (response: Response) => void;
    children: any;
    resizable?: boolean;
    draggable?: boolean;
    resizerImageSource?: ImageSourcePropType;
    style?: ViewStyle;
};
declare function Drag(props: DragProps): JSX.Element;
export default Drag;
