// Type definitions for react-native-step-indicator
// Project: https://github.com/24ark/react-native-step-indicator
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.3

import React from 'react'

interface StepIndicatorStyles {
  stepIndicatorSize?: number
  currentStepIndicatorSize?: number
  separatorStrokeWidth?: number
  stepStrokeWidth?: number
  currentStepStrokeWidth?: number
  stepStrokeCurrentColor?: string
  stepStrokeFinishedColor?: string
  stepStrokeUnFinishedColor?: string
  separatorFinishedColor?: string
  separatorUnFinishedColor?: string
  stepIndicatorFinishedColor?: string
  stepIndicatorUnFinishedColor?: string
  stepIndicatorCurrentColor?: string
  stepIndicatorLabelFontSize?: number
  currentStepIndicatorLabelFontSize?: number
  stepIndicatorLabelCurrentColor?: string
  stepIndicatorLabelFinishedColor?: string
  stepIndicatorLabelUnFinishedColor?: string
  labelColor?: string
  currentStepLabelColor?: string
  labelSize?: number
}

interface StepIndicatorProps {
  currentPosition?: number
  stepCount?: number
  direction?: 'horizontal' | 'vertical'
  customStyles?: StepIndicatorStyles
  labels?: string[]
}

export default class StepIndicator extends React.Component<StepIndicatorProps, null> { }