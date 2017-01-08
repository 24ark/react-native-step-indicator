
import React, { Component,PropTypes } from 'react';
import { View,Text,StyleSheet, Dimensions, Animated, Easing } from 'react-native';
const STEP_COUNT = 5;
const STEP_INDICATOR_SIZE = 30;
const SELECTED_STEP_INDICATOR_SIZE_DELTA = 10;
const SEPARATOR_STROKE_WIDTH = 10;
const STEP_INDICATOR_COLOR_CURRENT = '#ffffff';
const STEP_INDICATOR_COLOR_FINISHED = '#4aae4f';
const STEP_INDICATOR_COLOR_UNFINISHED = '#a4d4a5';
const SEPARATOR_COLOR_FINISHED = '#4aae4f';
const SEPARATOR_COLOR_UNFINISHED = '#a4d4a5';
const STEP_INDICATOR_LABEL_SIZE = 15;
const STEP_INDICATOR_LABEL_COLOR_CURRENT = '#000000';
const STEP_INDICATOR_LABEL_COLOR_FINISHED = '#ffffff';
const STEP_INDICATOR_LABEL_COLOR_UNFINISHED = 'rgba(255,255,255,0.5)';

export default class StepIndicator extends Component {

  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      width:0
    }
  }

  componentWillReceiveProps(newProps) {
    this.animateStep();
    console.log("ANIMATED");
  }


  render() {
    return (
      <View onLayout={(event) => this.measureView(event)} style={styles.container}>
        {this.renderStepIndicator()}
      </View>
    );
  }

  measureView(event) {
    var {width} = Dimensions.get('window');
    this.setState({
      width: event.nativeEvent.layout.width,
    })
  }

  renderStepIndicator = () => {
    let steps = [];
    for(let position = 0 ; position < STEP_COUNT ; position++) {

      steps.push(<View key={position} style={styles.stepContainer}>
        {this.renderStep(position)}
        {position !== STEP_COUNT - 1 && this.renderStrip(position)}
      </View>)
    }
    return(
      <View style={styles.stepIndicatorContainer}>
        {steps}
      </View>
    )
  }

  renderStep = (position) => {
    const { currentPosition } = this.props;
    let stepStyle;
    let stepLabelStyle;
    let selectedStepStyle;
    const stepSize = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [STEP_INDICATOR_SIZE, STEP_INDICATOR_SIZE + SELECTED_STEP_INDICATOR_SIZE_DELTA]
    });
    const stepBorderRadius = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [STEP_INDICATOR_SIZE/2, (STEP_INDICATOR_SIZE + SELECTED_STEP_INDICATOR_SIZE_DELTA)/2]
    });
    if(position === currentPosition) {
      stepStyle = styles.stepCurrent;
      stepLabelStyle = styles.stepLabelCurrent;
      //console.log("STYLE " , selectedStepStyle);

    }
    else if(position < currentPosition){
      stepStyle = styles.stepFinished;
      stepLabelStyle = styles.stepLabelFinished;
      //selectedStepStyle={height:STEP_INDICATOR_SIZE , width:STEP_INDICATOR_SIZE, borderRadius:STEP_INDICATOR_SIZE/2};
    }
    else {
      stepStyle = styles.stepUnFinished;
      stepLabelStyle = styles.stepLabelUnFinished;
      //selectedStepStyle={height:STEP_INDICATOR_SIZE , width:STEP_INDICATOR_SIZE, borderRadius:STEP_INDICATOR_SIZE/2}
    }
    selectedStepStyle = {height:stepSize , width:stepSize, borderRadius:stepBorderRadius}


    return (
      <Animated.View style={[styles.step , stepStyle ]}>
        <Text style={[styles.stepLabel , stepLabelStyle]}>{ position + 1 }</Text>
      </Animated.View>
    );
  }

  animateStep = () => {
    console.log("ANIMATE STEP");
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 100,
        easing: Easing.exp
      }
    ).start()
  }

  renderStrip = (position) => {
    const { currentPosition } = this.props;
    return(
      <View style={[styles.separator , {width:this.getSeparatorWidth()}, position < currentPosition ? styles.separatorFinished : styles.separatorUnFinished]}/>
    )
  }

  getSeparatorWidth = () => {
    const separatorWidth = (this.state.width - STEP_COUNT*STEP_INDICATOR_SIZE - (SELECTED_STEP_INDICATOR_SIZE_DELTA*2) + 32*(STEP_COUNT-1)) / (STEP_COUNT-1);
    return separatorWidth;
  }

  setCurrentPosition = () => {

  }
}

const styles = StyleSheet.create({
  container: {
  },
  stepIndicatorContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  step: {
    height:STEP_INDICATOR_SIZE,
    width:STEP_INDICATOR_SIZE,
    borderRadius:STEP_INDICATOR_SIZE / 2,
    alignItems:'center',
    justifyContent:'center',
    zIndex: 2
  },
  stepCurrent: {
    backgroundColor:STEP_INDICATOR_COLOR_CURRENT,
    borderWidth:5,
    borderColor:STEP_INDICATOR_COLOR_FINISHED,
    height:STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA,
    width:STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA,
    borderRadius:(STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA) / 2,
  },
  stepFinished: {
    backgroundColor:STEP_INDICATOR_COLOR_FINISHED
  },
  stepUnFinished: {
    backgroundColor:STEP_INDICATOR_COLOR_UNFINISHED
  },
  separator: {
    height:SEPARATOR_STROKE_WIDTH,
    marginHorizontal: -16,
  },
  separatorFinished: {
    backgroundColor:SEPARATOR_COLOR_FINISHED
  },
  separatorUnFinished: {
    backgroundColor:SEPARATOR_COLOR_UNFINISHED
  },
  stepLabel: {
    fontSize: STEP_INDICATOR_LABEL_SIZE,
    color:'#ffffff'
  },
  stepLabelCurrent: {
    color:STEP_INDICATOR_LABEL_COLOR_CURRENT,
  },
  stepLabelFinished: {
    color:STEP_INDICATOR_LABEL_COLOR_FINISHED
  },
  stepLabelUnFinished: {
    color:STEP_INDICATOR_LABEL_COLOR_UNFINISHED
  },
  stepContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});

StepIndicator.propTypes = {
  currentPosition: PropTypes.number
};

StepIndicator.defaultProps = {
  currentPosition: 0
}
