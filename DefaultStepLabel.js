import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const ViewPropTypes = require('react-native').ViewPropTypes || View.propTypes;

const styles = StyleSheet.create({
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

function DefaultStepLabel(props) {
  const { index, label, onLabelPress, selectedStepLabelStyle, customStyles } = props;
    return (
      <TouchableWithoutFeedback style={styles.stepLabelItem}  onPress={() => onLabelPress(index)}>
        <View style={styles.stepLabelItem}>
          <Text style={[styles.stepLabel, selectedStepLabelStyle , { fontSize: customStyles.labelSize }]}>
            {label}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
}

DefaultStepLabel.propTypes = {
  onLabelPress: PropTypes.func
}

DefaultStepLabel.defaultProps = {
  onLabelPress: () => ''
};

export default DefaultStepLabel;
