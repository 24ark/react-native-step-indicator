
import React, { Component,PropTypes } from 'react';
import { View,Text,StyleSheet } from 'react-native';
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

export default class NewStepIndicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width:0
    }
  }

  render() {
    const { labels } = this.props;
    return (
      <View onLayout={(event) => this.measureView(event)} style={styles.container}>
        {this.renderStepIndicator()}
        {labels && this.renderStepLabels()}
      </View>
    );
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
    })
  }

  renderStepIndicator = () => {
    let steps = [];
    const { labels } = this.props;
    for(let position = 0 ; position < STEP_COUNT ; position++) {
      steps.push(
        <View key={position} style={styles.stepContainer}>
          {this.renderStep(position)}
        </View>)
      }
      return(
        <View style={styles.stepIndicatorContainer}>
          {steps}
        </View>
      )
    }

    renderStepLabels = () => {
      const { labels } = this.props;
      var labelViews = labels.map((label,index) => {
        return (
          <Text key={index} style={styles.stepLabel}>
            {label}
          </Text>
        )
      });

      return(
        <View style={styles.stepLabelsContainer}>
          {labelViews}
        </View>
      )
    }

    renderStep = (position) => {
      const { currentPosition } = this.props;
      let stepStyle;
      let indicatorLabelStyle;
      let leftSeparatorStyle;
      let rightSeparatorStyle;
      if(position === currentPosition) {
        stepStyle = styles.stepCurrent;
        indicatorLabelStyle = styles.indicatorLabelCurrent;
        leftSeparatorStyle = styles.separatorFinished;
        rightSeparatorStyle = styles.separatorUnFinished;
      }
      else if(position < currentPosition){
        stepStyle = styles.stepFinished;
        indicatorLabelStyle = styles.indicatorLabelFinished;
        leftSeparatorStyle = styles.separatorFinished;
        rightSeparatorStyle = styles.separatorFinished;
      }
      else {
        stepStyle = styles.stepUnFinished;
        indicatorLabelStyle = styles.indicatorLabelUnFinished;
        leftSeparatorStyle = styles.separatorUnFinished;
        rightSeparatorStyle = styles.separatorUnFinished;
      }


      return [
        <View key={'left-separator'} style={[styles.separator,(position !== 0) ? leftSeparatorStyle : {backgroundColor:'transparent'},{width:this.getSeparatorWidth(), marginRight:-1*(STEP_INDICATOR_SIZE/2)}]}/>,
        <View key={'step-indicator'} style={[styles.step , stepStyle ]}>
          <Text style={[styles.indicatorLabel , indicatorLabelStyle]}>{ position + 1 }</Text>
        </View>,
        <View key={'right-separator'} style={[styles.separator,(position !== STEP_COUNT - 1) ? rightSeparatorStyle : {backgroundColor:'transparent'},{width:this.getSeparatorWidth(), marginLeft:-1*(STEP_INDICATOR_SIZE/2)}]}/>
      ];
    }

    getSeparatorWidth = () => {
      const separatorWidth = (this.state.width/(STEP_COUNT*2));
      return separatorWidth;
    }

    setCurrentPosition = () => {

    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor:'yellow'
    },
    stepIndicatorContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
    },
    stepLabelsContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
      paddingTop: 8
    },
    step: {
      height:STEP_INDICATOR_SIZE,
      width:STEP_INDICATOR_SIZE,
      borderRadius:STEP_INDICATOR_SIZE / 2,
      alignItems:'center',
      justifyContent:'center',
      zIndex: 2,
      elevation:3
    },
    stepCurrent: {
      backgroundColor:STEP_INDICATOR_COLOR_CURRENT,
      borderWidth:5,
      borderColor:STEP_INDICATOR_COLOR_FINISHED,
      height:STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA,
      width:STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA,
      borderRadius:(STEP_INDICATOR_SIZE+SELECTED_STEP_INDICATOR_SIZE_DELTA) / 2
    },
    stepFinished: {
      backgroundColor:STEP_INDICATOR_COLOR_FINISHED,
    },
    stepUnFinished: {
      backgroundColor:STEP_INDICATOR_COLOR_UNFINISHED
    },
    separator: {
      height:SEPARATOR_STROKE_WIDTH
    },
    separatorFinished: {
      backgroundColor:SEPARATOR_COLOR_FINISHED
    },
    separatorUnFinished: {
      backgroundColor:SEPARATOR_COLOR_UNFINISHED
    },
    indicatorLabel: {
      fontSize: STEP_INDICATOR_LABEL_SIZE,
      color:'#ffffff'
    },
    indicatorLabelCurrent: {
      color:STEP_INDICATOR_LABEL_COLOR_CURRENT,
    },
    indicatorLabelFinished: {
      color:STEP_INDICATOR_LABEL_COLOR_FINISHED
    },
    indicatorLabelUnFinished: {
      color:STEP_INDICATOR_LABEL_COLOR_UNFINISHED
    },
    stepContainer: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    stepLabel: {
      flex:1,
      fontSize:12,
      textAlign:'center',
      alignSelf:'flex-start'
    }
  });

  NewStepIndicator.propTypes = {
    currentPosition: PropTypes.number
  };

  NewStepIndicator.defaultProps = {
    currentPosition: 0
  }
