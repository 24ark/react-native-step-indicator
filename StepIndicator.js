
import React, { Component,PropTypes } from 'react';
import { View,Text,StyleSheet } from 'react-native';

const STEP_STATUS = {
  CURRENT:'current',
  FINISHED:'finished',
  UNFINISHED:'unfinished'
}



export default class StepIndicator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width:0,
      height:0
    }

    const defaultStyles = {
      stepIndicatorSize: 30,
      currentStepIndicatorSize:40,
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

    this.customStyles = Object.assign(defaultStyles, props.customStyles);
  }

  render() {
    const { labels, direction } = this.props;
    return (
      <View onLayout={(event) => this.setState({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})} style={[styles.container, direction === 'vertical' ? {flexDirection: 'row', flex:1} : {flexDirection: 'column'}]}>
        {this.renderStepIndicator()}
        {labels && this.renderStepLabels()}
      </View>
    );
  }

  renderStepIndicator = () => {
    let steps = [];
    const { labels, stepCount, direction } = this.props;
    for(let position = 0 ; position < stepCount ; position++) {
      steps.push(
        <View key={position} style={[styles.stepContainer, direction === 'vertical' ? {flexDirection: 'column'} : {flexDirection: 'row'}]}>
          {this.renderStep(position)}
        </View>)
      }
      return(
        <View style={[styles.stepIndicatorContainer, direction === 'vertical' ? {flexDirection: 'column'} : {flexDirection: 'row'}]}>
          {steps}
        </View>
      )
    }

    renderStepLabels = () => {
      const { labels, direction, currentPosition } = this.props;
      var labelViews = labels.map((label,index) => {
        const selectedStepLabelStyle = index === currentPosition ? { color: this.customStyles.currentStepLabelColor } : { color: this.customStyles.labelColor }
        return (
          <View style={styles.stepLabelItem} key={index}>
            <Text style={[styles.stepLabel,selectedStepLabelStyle , { fontSize: this.customStyles.labelSize }]}>
              {label}
            </Text>
          </View>
        )
      });

      return(
        <View style={[styles.stepLabelsContainer, direction === 'vertical' ? {flexDirection: 'column', paddingHorizontal:4} : {flexDirection: 'row', paddingVertical:4}]}>
          {labelViews}
        </View>
      )
    }

    renderStep = (position) => {
      const { currentPosition, stepCount, direction } = this.props;
      let stepStyle;
      let indicatorLabelStyle;
      let leftSeparatorStyle;
      let rightSeparatorStyle;
      const separatorStyle = (direction === 'vertical') ? { width: this.customStyles.separatorStrokeWidth, zIndex:10 } : { height: this.customStyles.separatorStrokeWidth }
      switch (this.getStepStatus(position)) {
        case STEP_STATUS.CURRENT: {
          stepStyle = {
            backgroundColor:this.customStyles.stepIndicatorCurrentColor,
            borderWidth:this.customStyles.currentStepStrokeWidth,
            borderColor:this.customStyles.stepStrokeCurrentColor,
            height:this.customStyles.currentStepIndicatorSize,
            width:this.customStyles.currentStepIndicatorSize,
            borderRadius:(this.customStyles.currentStepIndicatorSize) / 2
          };
          indicatorLabelStyle = { fontSize: this.customStyles.currentStepIndicatorLabelFontSize, color: this.customStyles.stepIndicatorLabelCurrentColor };
          leftSeparatorStyle = { backgroundColor: this.customStyles.separatorFinishedColor };
          rightSeparatorStyle = { backgroundColor: this.customStyles.separatorUnFinishedColor };

          break;
        }
        case STEP_STATUS.FINISHED:{
          stepStyle = {
            backgroundColor: this.customStyles.stepIndicatorFinishedColor,
            borderWidth:this.customStyles.stepStrokeWidth,
            borderColor:this.customStyles.stepStrokeFinishedColor,
            height:this.customStyles.stepIndicatorSize,
            width:this.customStyles.stepIndicatorSize,
            borderRadius:(this.customStyles.stepIndicatorSize) / 2
          };
          indicatorLabelStyle = { fontSize: this.customStyles.stepIndicatorLabelFontSize, color: this.customStyles.stepIndicatorLabelFinishedColor };;
          leftSeparatorStyle = { backgroundColor: this.customStyles.separatorFinishedColor };
          rightSeparatorStyle = { backgroundColor: this.customStyles.separatorFinishedColor };

          break;
        }

        case STEP_STATUS.UNFINISHED:{
          stepStyle = {
            backgroundColor: this.customStyles.stepIndicatorUnFinishedColor,
            borderWidth:this.customStyles.stepStrokeWidth,
            borderColor:this.customStyles.stepStrokeUnFinishedColor,
            height:this.customStyles.stepIndicatorSize,
            width:this.customStyles.stepIndicatorSize,
            borderRadius:(this.customStyles.stepIndicatorSize) / 2
          };
          indicatorLabelStyle = {overflow: 'hidden', fontSize: this.customStyles.stepIndicatorLabelFontSize, color: this.customStyles.stepIndicatorLabelUnFinishedColor };
          leftSeparatorStyle = { backgroundColor: this.customStyles.separatorUnFinishedColor };
          rightSeparatorStyle = { backgroundColor: this.customStyles.separatorUnFinishedColor };
          break;
        }
        default:
      }

      return [
        <View key={'left-separator'} style={[separatorStyle,(position !== 0) ? leftSeparatorStyle : {backgroundColor:'transparent'}, direction === 'vertical' ? {height:this.getSeparatorWidth(), marginTop:-1*(this.customStyles.stepIndicatorSize/2)} : {width:this.getSeparatorWidth(), marginRight:-1*(this.customStyles.stepIndicatorSize/2)}]}/>,
        <View key={'step-indicator'} removeClippedSubviews style={[styles.step , stepStyle ]}>
          <Text style={indicatorLabelStyle}>{ position + 1 }</Text>
        </View>,
        <View key={'right-separator'} style={[separatorStyle,(position !== stepCount - 1) ? rightSeparatorStyle : {backgroundColor:'transparent'},direction === 'vertical' ? {height:this.getSeparatorWidth(), marginBottom:-1*(this.customStyles.stepIndicatorSize/2)} : {width:this.getSeparatorWidth(), marginRight:-1*(this.customStyles.stepIndicatorSize/2)}]}/>
      ];
    }

    getSeparatorWidth = () => {
      const { stepCount, direction } = this.props;
      const separatorWidth = direction === 'vertical' ? (this.state.height/(stepCount*2)) : (this.state.width/(stepCount*2));
      return separatorWidth;
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
  }

  const styles =  StyleSheet.create({
    container: {
      backgroundColor:'transparent'
    },
    stepIndicatorContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
    },
    stepLabelsContainer: {
      alignItems:'center',
      justifyContent:'space-around'
    },
    step: {
      alignItems:'center',
      justifyContent:'center',
      zIndex: 2,
      elevation:3
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
    labels: PropTypes.array
  };

  StepIndicator.defaultProps = {
    currentPosition: 0,
    stepCount: 5,
    customStyles: {},
    direction: 'horizontal'
  };
