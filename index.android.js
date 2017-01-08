/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import { AppRegistry,StyleSheet,View, Text } from 'react-native';
import ViewPager from 'react-native-viewpager';
import StepIndicator from './StepIndicator';
const PAGES = ['Page 1','Page 2','Page 3','Page 4','Page 5'];

export default class App extends Component {

  constructor() {
    super();
    var dataSource = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      dataSource: dataSource.cloneWithPages(PAGES),
      currentPage:0
    }
  }

  render() {
    const that = this;
    console.log("STATE PAGE " , this.state.currentPage);
    return (
      <View style={styles.container}>
        <StepIndicator currentPosition={this.state.currentPage} />
        <ViewPager
          dataSource={this.state.dataSource}
          renderPage={this.renderViewPagerPage}
          onChangePage={(page) => {console.log("page ",page);that.setState({currentPage:page})}}
          />
      </View>
    );
  }

  renderViewPagerPage = (data) => {
    return(<View style={styles.page}>
      <Text>{data}</Text>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:30,
    backgroundColor: '#F5FCFF',
  },
  page: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

AppRegistry.registerComponent('StepIndicator', () => App);
