import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#fe7013',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 15,
  currentStepLabelColor: '#fe7013'
}

export default class VerticalStepIndicator extends Component {

  constructor() {
    super();

    this.state = {
      currentPage:0
    };
    this.viewabilityConfig = {itemVisiblePercentThreshold: 40}
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={stepIndicatorStyles}
              stepCount={6}
              direction='vertical'
              currentPosition={this.state.currentPage}
              labels={dummyData.data.map(item => item.title)}
              />
          </View>
          <FlatList
            style={{flexGrow:1}}
            data={dummyData.data}
            renderItem={this.renderPage}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={this.viewabilityConfig}
          />
      </View>
    );
  }

  renderPage = (rowData) => {
    const item = rowData.item
    return (
      <View style={styles.rowItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    )
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
      const visibleItemsCount = viewableItems.length;
      if(visibleItemsCount != 0) {
      this.setState({currentPage:viewableItems[visibleItemsCount-1].index})
    };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#ffffff'
  },
  stepIndicator: {
    marginVertical:50,
    paddingHorizontal:20
  },
  rowItem: {
    flex:3,
    paddingVertical:20
  },
  title: {
    flex: 1,
    fontSize:20,
    color:'#333333',
    paddingVertical:16,
    fontWeight:'600'
  },
  body: {
    flex: 1,
    fontSize:15,
    color:'#606060',
    lineHeight:24,
    marginRight:8
  }
});
