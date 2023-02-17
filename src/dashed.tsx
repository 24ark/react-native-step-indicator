import React, { useMemo, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { StepIndicatorProps } from './types';

export interface DashedLineProps {
  direction: StepIndicatorProps['direction'];
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashStyle?: StyleProp<ViewStyle>;
  dashColor?: string;
  setProgressBarSize: (size: number) => void;
}

const DashedLine: React.FC<DashedLineProps> = ({
  direction = 'horizontal',
  dashGap = 2,
  dashLength = 4,
  dashThickness = 1,
  dashColor = 'black',
  dashStyle,
  setProgressBarSize,
}) => {
  const [length, setLength] = useState<number>(0);

  const n = Math.ceil(length / (dashGap + dashLength));

  const arrayOfDashes = [...new Array(n).fill(null)];

  const isHorizontal = direction === 'horizontal';

  const dashStyles = useMemo(
    () => ({
      width: isHorizontal ? dashLength : dashThickness,
      height: isHorizontal ? dashThickness : dashLength,
      marginRight: isHorizontal ? dashGap : 0,
      marginBottom: isHorizontal ? 0 : dashGap,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness, isHorizontal]
  );

  const dashStyleContainerDirection: ViewStyle = {
    flexDirection: isHorizontal ? 'row' : 'column',
  };

  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        const size = isHorizontal ? width : height;
        setLength(size);
        setProgressBarSize(size);
      }}
      style={[
        styles.dashStyleContainer,
        dashStyleContainerDirection,
        dashStyle,
      ]}
    >
      {arrayOfDashes.map((_, index) => (
        <View key={index} style={[dashStyles]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dashStyleContainer: {
    position: 'absolute',
  },
});

export default DashedLine;
