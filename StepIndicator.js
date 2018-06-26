
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View,Text,StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const STEP_STATUS = {
  CURRENT:'current',
  FINISHED:'finished',
  UNFINISHED:'unfinished'
}

export default class StepIndicator extends PureComponent {

  constructor(props) {
    super(props);

    const defaultStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize: 40,
      separatorStrokeWidth: 3,
      currentStepStrokeWidth: 5,
      stepStrokeWidth: 0,
      stepStrokeCurrentColor: '#4aae4f',
      stepStrokeFinishedColor: '#4aae4f',
      stepStrokeUnFinishedColor: '#4aae4f',
      separatorFinishedColor: '#4aae4f',
      separatorUnFinishedColor: '#a4d4a5',
      stepIndicatorFinishedColor: '#4aae4f',
      stepIndicatorUnFinishedColor: '#a4d4a5',
      stepIndicatorCurrentColor: '#ffffff',
      stepIndicatorLabelFontSize: 15,
      currentStepIndicatorLabelFontSize: 15,
      stepIndicatorLabelCurrentColor: '#000000',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
      labelColor: '#000000',
      labelSize: 13,
      currentStepLabelColor: '#4aae4f'
    };
    const customStyles = Object.assign(defaultStyles, props.customStyles);

    this.state = {
      width: 0,
      height: 0,
      progressBarSize: 0,
      customStyles
    };

    this.progressAnim = new Animated.Value(0)
    this.sizeAnim = new Animated.Value(this.state.customStyles.stepIndicatorSize);
    this.borderRadiusAnim = new Animated.Value(this.state.customStyles.stepIndicatorSize/2);
  }

  stepPressed(position) {
    if(this.props.onPress) {
      this.props.onPress(position)
    }
  }

  render() {
    const { labels, direction } = this.props;
    return (
      <View style={[styles.container, direction === 'vertical' ? {flexDirection: 'row', flex:1} : {flexDirection: 'column'}]}>
        {this.state.width !== 0 && this.renderProgressBarBackground()}
        {this.state.width !== 0 && this.renderProgressBar()}
        {this.renderStepIndicator()}
        {labels && this.renderStepLabels()}
      </View>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customStyles !== this.props.customStyles) {
      this.setState(state => ({
        customStyles: Object.assign(state.customStyles, nextProps.customStyles)
      }));
    }
    if(nextProps.currentPosition !== this.props.currentPosition) {
      this.onCurrentPositionChanged(nextProps.currentPosition);
    }
  }

  renderProgressBarBackground = () => {
    const { stepCount, direction } = this.props;
    let progressBarBackgroundStyle;
    if(direction === 'vertical') {
      progressBarBackgroundStyle = {
        backgroundColor:this.state.customStyles.separatorUnFinishedColor,
        position:'absolute',
        left:(this.state.width - this.state.customStyles.separatorStrokeWidth)/2,
        top:this.state.height/(2*stepCount),
        bottom:this.state.height/(2*stepCount),
        width:this.state.customStyles.separatorStrokeWidth
      }
    }
    else {
      progressBarBackgroundStyle = {
        backgroundColor:this.state.customStyles.separatorUnFinishedColor,
        position:'absolute',
        top:(this.state.height - this.state.customStyles.separatorStrokeWidth)/2,
        left:this.state.width/(2*stepCount),
        right:this.state.width/(2*stepCount),
        height:this.state.customStyles.separatorStrokeWidth
      }
    }
    return(
      <View
        onLayout={(event) => {
          if(direction === 'vertical') {
            this.setState({progressBarSize: event.nativeEvent.layout.height} , () => {this.onCurrentPositionChanged(this.props.currentPosition)})
          }
          else {
            this.setState({progressBarSize: event.nativeEvent.layout.width} , () => {this.onCurrentPositionChanged(this.props.currentPosition)})
          }
        }}
        style={progressBarBackgroundStyle}/>
    )
  }

  renderProgressBar = () => {
    const { stepCount, direction } = this.props;
    let progressBarStyle;
    if(direction === 'vertical') {
      progressBarStyle = {
        backgroundColor:this.state.customStyles.separatorFinishedColor,
        position:'absolute',
        left:(this.state.width - this.state.customStyles.separatorStrokeWidth)/2,
        top:this.state.height/(2*stepCount),
        bottom:this.state.height/(2*stepCount),
        width:this.state.customStyles.separatorStrokeWidth,
        height:this.progressAnim
      }
    }
    else {
      progressBarStyle = {
        backgroundColor:this.state.customStyles.separatorFinishedColor,
        position:'absolute',
        top:(this.state.height - this.state.customStyles.separatorStrokeWidth)/2,
        left:this.state.width/(2*stepCount),
        right:this.state.width/(2*stepCount),
        height:this.state.customStyles.separatorStrokeWidth,
        width:this.progressAnim
      }
    }
    return(
      <Animated.View
        style={progressBarStyle}/>
    )
  }

  renderStepIndicator = () => {
    let steps = [];
    const { labels, stepCount, direction } = this.props;
    for(let position = 0 ; position < stepCount ; position++) {
      steps.push(
        <TouchableWithoutFeedback key={position} onPress={() => this.stepPressed(position)}>
          <View style={[styles.stepContainer, direction === 'vertical' ? {flexDirection: 'column'} : {flexDirection: 'row'}]}>
            {this.renderStep(position)}
          </View>
        </TouchableWithoutFeedback>
        )
      }
      return(
        <View onLayout={(event) => this.setState({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})} style={[styles.stepIndicatorContainer, direction === 'vertical' ? {flexDirection: 'column', width:this.state.customStyles.currentStepIndicatorSize} : {flexDirection: 'row', height:this.state.customStyles.currentStepIndicatorSize}]}>
          {steps}
        </View>
      )
    }

    renderStepLabels = () => {
      const { labels, direction, currentPosition } = this.props;
      var labelViews = labels.map((label,index) => {
        const selectedStepLabelStyle = index === currentPosition ? { color: this.state.customStyles.currentStepLabelColor } : { color: this.state.customStyles.labelColor }
        return (
          <TouchableWithoutFeedback style={styles.stepLabelItem} key={index} onPress={() => this.stepPressed(index)}>
            <View style={styles.stepLabelItem}>
              <Text style={[styles.stepLabel,selectedStepLabelStyle , { fontSize: this.state.customStyles.labelSize }]}>
                {label}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )
      });

      return(
        <View style={[styles.stepLabelsContainer, direction === 'vertical' ? {flexDirection: 'column', paddingHorizontal:4} : {flexDirection: 'row', paddingVertical:4}]}>
          {labelViews}
        </View>
      )
    }

    renderStep = (position) => {
      const { currentPosition, stepCount, direction, renderStepIndicator } = this.props;
      let stepStyle;
      let indicatorLabelStyle;
      const separatorStyle = (direction === 'vertical') ? { width: this.state.customStyles.separatorStrokeWidth, zIndex:10 } : { height: this.state.customStyles.separatorStrokeWidth }
      switch (this.getStepStatus(position)) {
        case STEP_STATUS.CURRENT: {
          stepStyle = {
            backgroundColor:this.state.customStyles.stepIndicatorCurrentColor,
            borderWidth:this.state.customStyles.currentStepStrokeWidth,
            borderColor:this.state.customStyles.stepStrokeCurrentColor,
            height:this.sizeAnim,
            width:this.sizeAnim,
            borderRadius:this.borderRadiusAnim
          };
          indicatorLabelStyle = { fontSize: this.state.customStyles.currentStepIndicatorLabelFontSize, color: this.state.customStyles.stepIndicatorLabelCurrentColor };

          break;
        }
        case STEP_STATUS.FINISHED:{
          stepStyle = {
            backgroundColor: this.state.customStyles.stepIndicatorFinishedColor,
            borderWidth:this.state.customStyles.stepStrokeWidth,
            borderColor:this.state.customStyles.stepStrokeFinishedColor,
            height:this.state.customStyles.stepIndicatorSize,
            width:this.state.customStyles.stepIndicatorSize,
            borderRadius:(this.state.customStyles.stepIndicatorSize) / 2
          };
          indicatorLabelStyle = { fontSize: this.state.customStyles.stepIndicatorLabelFontSize, color: this.state.customStyles.stepIndicatorLabelFinishedColor };
          break;
        }

        case STEP_STATUS.UNFINISHED:{
          stepStyle = {
            backgroundColor: this.state.customStyles.stepIndicatorUnFinishedColor,
            borderWidth:this.state.customStyles.stepStrokeWidth,
            borderColor:this.state.customStyles.stepStrokeUnFinishedColor,
            height:this.state.customStyles.stepIndicatorSize,
            width:this.state.customStyles.stepIndicatorSize,
            borderRadius:(this.state.customStyles.stepIndicatorSize) / 2
          };
          indicatorLabelStyle = {overflow: 'hidden', fontSize: this.state.customStyles.stepIndicatorLabelFontSize, color: this.state.customStyles.stepIndicatorLabelUnFinishedColor };
          break;
        }
        default:
      }

      return (
        <Animated.View key={'step-indicator'} style={[styles.step , stepStyle ]}>
          {
            renderStepIndicator ? renderStepIndicator({
          position,
          stepStatus: this.getStepStatus(position),
        }) : <Text style={indicatorLabelStyle}>{ position + 1 }</Text>}
        </Animated.View>
      );
    }

    getStepStatus = (stepPosition) => {
      const { currentPosition } = this.props;
      if(stepPosition === currentPosition) {
        return STEP_STATUS.CURRENT;
      }
      else if(stepPosition < currentPosition) {
        return STEP_STATUS.FINISHED;
      }
      else {
        return STEP_STATUS.UNFINISHED;
      }
    }

    onCurrentPositionChanged = (position) => {
      let { stepCount } = this.props
      if(position > stepCount-1) {
        position = stepCount-1;
      }
      const animateToPosition = (this.state.progressBarSize/ (stepCount - 1)) * position;
      this.sizeAnim.setValue(this.state.customStyles.stepIndicatorSize);
      this.borderRadiusAnim.setValue(this.state.customStyles.stepIndicatorSize/2);
      Animated.sequence([
        Animated.timing(
          this.progressAnim,
          {toValue: animateToPosition,duration:200}
        ),
        Animated.parallel([
          Animated.timing(
            this.sizeAnim,
            {toValue: this.state.customStyles.currentStepIndicatorSize, duration:100}
          ),
          Animated.timing(
            this.borderRadiusAnim,
            {toValue: this.state.customStyles.currentStepIndicatorSize/2, duration:100}
          )
        ])
      ]).start();
    }

  }

  const styles =  StyleSheet.create({
    container: {
      backgroundColor:'transparent'
    },
    stepIndicatorContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      backgroundColor:'transparent'
    },
    stepLabelsContainer: {
      alignItems:'center',
      justifyContent:'space-around'
    },
    step: {
      alignItems:'center',
      justifyContent:'center',
      zIndex: 2
    },
    stepContainer: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    stepLabel: {
      fontSize:12,
      textAlign:'center',
      fontWeight:'500'
    },
    stepLabelItem: {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    }
  });

  StepIndicator.propTypes = {
    currentPosition: PropTypes.number,
    stepCount: PropTypes.number,
    customStyles: PropTypes.object,
    direction: PropTypes.oneOf(['vertical', 'horizontal']),
    labels: PropTypes.array,
    onPress: PropTypes.func,
    renderStepIndicator: PropTypes.func,
  };

  StepIndicator.defaultProps = {
    currentPosition: 0,
    stepCount: 5,
    customStyles: {},
    direction: 'horizontal'
  };
