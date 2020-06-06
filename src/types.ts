// Type definitions for react-native-step-indicator
// Project: https://github.com/24ark/react-native-step-indicator
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.3.3

import React from 'react';

export interface StepIndicatorStyles {
  /**
   * Size of step indicator circle
   *
   * @default 30
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorSize?: number;

  /**
   * Size of the current step indicator circle
   *
   * @default 40
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  currentStepIndicatorSize?: number;

  /**
   * Stroke thickness of the separator between steps
   *
   * @default 2
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  separatorStrokeWidth?: number;

  /**
   * Stroke thickness of the separator between unifinished steps
   *
   * @default 0
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  separatorStrokeUnfinishedWidth?: number;

  /**
   * Stroke thickness of the separator between finished steps
   *
   * @default 0
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  separatorStrokeFinishedWidth?: number;

  /**
   * Thickness of the stroke around each step
   *
   * @default 3
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  stepStrokeWidth?: number;

  /**
   * Thickness of the stroke around the current step
   *
   * @default 3
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  currentStepStrokeWidth?: number;

  /**
   * Stroke color for the current step
   *
   * @default '#fe7013'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepStrokeCurrentColor?: string;

  /**
   * Stroke color for finished steps
   *
   * @default '#fe7013'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepStrokeFinishedColor?: string;

  /**
   * Stroke color for unfinished steps
   *
   * @default '#aaaaaa'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepStrokeUnFinishedColor?: string;

  /**
   * Color of separator for finished items
   *
   * @default '#fe7013'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  separatorFinishedColor?: string;

  /**
   * Color of separator for unfinished items
   *
   * @default '#aaaaaa'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  separatorUnFinishedColor?: string;

  /**
   * Color of the circle for finished steps
   *
   * @default '#fe7013'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorFinishedColor?: string;

  /**
   * Color of the circle for unfinished steps
   *
   * @default '#ffffff'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorUnFinishedColor?: string;

  /**
   * Color of the circle for the current step
   *
   * @default '#ffffff'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorCurrentColor?: string;

  /**
   * Font size of the number inside the circle for each step
   *
   * @default 15
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorLabelFontSize?: number;

  /**
   * Font size of the number inside the circle for the current step
   *
   * @default 15
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  currentStepIndicatorLabelFontSize?: number;

  /**
   * Color of label for the current step
   *
   * @default '#ffffff'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorLabelCurrentColor?: string;

  /**
   * Color of labels that their steps are finished
   *
   * @default '#ffffff'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorLabelFinishedColor?: string;

  /**
   * Color of labels that their steps are unfinished
   *
   * @default 'rgba(255,255,255,0.5)'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  stepIndicatorLabelUnFinishedColor?: string;

  /**
   * Color of the label text
   *
   * @default '#000000'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  labelColor?: string;

  /**
   * Color of the current step label
   *
   * @default '#4aae4f'
   * @type {string}
   * @memberof StepIndicatorStyles
   */
  currentStepLabelColor?: string;

  /**
   * Font size for the labels
   *
   * @default 13
   * @type {number}
   * @memberof StepIndicatorStyles
   */
  labelSize?: number;

  /**
   * Label alignment
   *
   * @default 'center'
   * @type {"center" | "flex-start" | "flex-end" | "stretch" | "baseline" | undefined}
   * @memberof StepIndicatorStyles
   *
   */
  labelAlign?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
    | undefined;

  /**
   * Label fontFamily for custom fonts
   *
   * @type {string}
   * @memberof StepIndicatorStyles
   *
   */
  labelFontFamily?: string;
}

export interface StepIndicatorProps {
  /**
   * Current step
   *
   * @default 0
   * @type {number}
   * @memberof StepIndicatorProps
   */
  currentPosition?: number;

  /**
   * Number of steps
   *
   * @default 5
   * @type {number}
   * @memberof StepIndicatorProps
   */
  stepCount?: number;

  /**
   * Orientation of the Steps
   *
   * @default 'horizontal'
   * @type {('horizontal' | 'vertical')}
   * @memberof StepIndicatorProps
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Styles for the component
   *
   * @type {StepIndicatorStyles}
   * @memberof StepIndicatorProps
   */
  customStyles?: StepIndicatorStyles;

  /**
   * Labels for each step
   *
   * @type {string[]}
   * @memberof StepIndicatorProps
   */
  labels?: string[];

  /**
   * Callback fired when tapping on a step
   *
   * @param {number} step
   *
   * @memberof StepIndicatorProps
   */
  onPress?(step: number): void;

  /**
   * Used to render custom content inside step at specified position
   *
   * @param {number} position
   * @param {string} stepStatus
   *
   * @memberof StepIndicatorProps
   */
  renderStepIndicator?(args: {
    position: number;
    stepStatus: string;
  }): React.ReactNode;

  /**
   * Use this to render custom label for each step
   *
   * @param {number} position
   * @param {string} stepStatus
   * @param {string} label
   * @param {number} currentPosition
   *
   * @memberof StepIndicatorProps
   */
  renderLabel?(args: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }): React.ReactNode;
}

export default class StepIndicator extends React.Component<
  StepIndicatorProps,
  {}
> {}
