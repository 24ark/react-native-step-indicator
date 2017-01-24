/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';
import StepIndicator from './StepIndicator';
import dummyData from './data';

export default class VerticalStepIndicator extends Component {

  constructor() {
    super();

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(dummyData.data),
      currentPage:0
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator stepCount={6} direction='vertical' currentPosition={this.state.currentPage} labels={dummyData.data.map(item => item.title)} />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onChangeVisibleRows={this.onChangeVisibleRows}
          />
      </View>
    );
  }

  renderRow = (rowData) => {
    return (
      <View style={styles.rowItem}>
        <Text style={styles.title}>{rowData.title}</Text>
        <Text style={styles.body}>{rowData.body}</Text>
      </View>
    )
  }

  onChangeVisibleRows = (visibleRows) => {

    const visibleRowNumbers = Object.keys(visibleRows.s1).map((row) => parseInt(row));
    this.setState({currentPage:visibleRowNumbers[0]})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
  },
  stepIndicator: {
    marginVertical: 100,
    paddingHorizontal:20
  },
  rowItem: {
    flex:3,
    paddingVertical:20
  },
  title: {
    flex: 1,
    fontSize:20,
    color:'#000000',
    paddingVertical:16,
    fontWeight:'600'
  },
  body: {
    flex: 1,
    fontSize:15,
    color:'#606060'
  }
});
