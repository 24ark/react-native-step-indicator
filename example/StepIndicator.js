
import React, { Component,PropTypes } from 'react';
import { View,Text,StyleSheet } from 'react-native';

var customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
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
}

export default class StepIndicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width:0,
      height:0
    }
    customStyles = Object.assign(customStyles, props.customStyles);
  }

  render() {
    const { labels, direction } = this.props;
    return (
      <View onLayout={(event) => this.setState({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})} style={[defaultStyle.container, direction === 'vertical' ? {flexDirection: 'row'} : {flexDirection: 'column'}]}>
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
        <View key={position} style={[defaultStyle.stepContainer, direction === 'vertical' ? {flexDirection: 'column'} : {flexDirection: 'row'}]}>
          {this.renderStep(position)}
        </View>)
      }
      return(
        <View style={[defaultStyle.stepIndicatorContainer, direction === 'vertical' ? {flexDirection: 'column'} : {flexDirection: 'row'}]}>
          {steps}
        </View>
      )
    }

    renderStepLabels = () => {
      const { labels, direction, currentPosition } = this.props;
      var labelViews = labels.map((label,index) => {
        const selectedStepLabelStyle = index === currentPosition ? { color: customStyles.currentStepLabelColor } : { color: customStyles.labelColor }
        return (
          <Text key={index} style={[defaultStyle.stepLabel,selectedStepLabelStyle , { fontSize: customStyles.labelSize }]}>
            {label}
          </Text>
        )
      });

      return(
        <View style={[defaultStyle.stepLabelsContainer, direction === 'vertical' ? {flexDirection: 'column', paddingHorizontal:4} : {flexDirection: 'row', paddingVertical:4}]}>
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
      const separatorStyle = (direction === 'vertical') ? { width: customStyles.separatorStrokeWidth } : { height: customStyles.separatorStrokeWidth }
      if(position === currentPosition) {
        stepStyle = {
          backgroundColor:customStyles.stepIndicatorCurrentColor,
          borderWidth:customStyles.currentStepStrokeWidth,
          borderColor:customStyles.stepIndicatorFinishedColor,
          height:customStyles.currentStepIndicatorSize,
          width:customStyles.currentStepIndicatorSize,
          borderRadius:(customStyles.currentStepIndicatorSize) / 2
        };
        indicatorLabelStyle = { fontSize: customStyles.currentStepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelCurrentColor };
        leftSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
      }
      else if(position < currentPosition){
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorFinishedColor,
          height:customStyles.stepIndicatorSize,
          width:customStyles.stepIndicatorSize,
          borderRadius:(customStyles.stepIndicatorSize) / 2
         };
        indicatorLabelStyle = { fontSize: customStyles.stepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelFinishedColor };;
        leftSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorFinishedColor };
      }
      else {
        stepStyle = {
          backgroundColor: customStyles.stepIndicatorUnFinishedColor,
          height:customStyles.stepIndicatorSize,
          width:customStyles.stepIndicatorSize,
          borderRadius:(customStyles.stepIndicatorSize) / 2
         };
        indicatorLabelStyle = { fontSize: customStyles.stepIndicatorLabelFontSize, color: customStyles.stepIndicatorLabelUnFinishedColor };
        leftSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
        rightSeparatorStyle = { backgroundColor: customStyles.separatorUnFinishedColor };
      }


      return [
        <View key={'left-separator'} style={[separatorStyle,(position !== 0) ? leftSeparatorStyle : {backgroundColor:'transparent'}, direction === 'vertical' ? {height:this.getSeparatorWidth(), marginTop:-1*(customStyles.stepIndicatorSize/2)} : {width:this.getSeparatorWidth(), marginRight:-1*(customStyles.stepIndicatorSize/2)}]}/>,
        <View key={'step-indicator'} style={[defaultStyle.step , stepStyle ]}>
          <Text style={indicatorLabelStyle}>{ position + 1 }</Text>
        </View>,
        <View key={'right-separator'} style={[separatorStyle,(position !== stepCount - 1) ? rightSeparatorStyle : {backgroundColor:'transparent'},direction === 'vertical' ? {height:this.getSeparatorWidth(), marginBottom:-1*(customStyles.stepIndicatorSize/2)} : {width:this.getSeparatorWidth(), marginRight:-1*(customStyles.stepIndicatorSize/2)}]}/>
      ];
    }

    getSeparatorWidth = () => {
      const { stepCount, direction } = this.props;
      const separatorWidth = direction === 'vertical' ? (this.state.height/(stepCount*2)) : (this.state.width/(stepCount*2));
      return separatorWidth;
    }

    setCurrentPosition = () => {

    }
  }

  const defaultStyle =  StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'transparent'
    },
    stepIndicatorContainer: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
    },
    stepLabelsContainer: {
      flexDirection:'row',
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
      flex:1,
      fontSize:12,
      textAlign:'center',
      textAlignVertical:'center'
    }
  });

  StepIndicator.propTypes = {
    currentPosition: PropTypes.number,
    stepCount: PropTypes.number,
    customStyles: PropTypes.object,
    direction: PropTypes.oneOf(['vertical', 'horizontal'])
  };

  StepIndicator.defaultProps = {
    currentPosition: 0,
    stepCount: 5,
    customStyles: {},
    direction: 'horizontal'
  };
