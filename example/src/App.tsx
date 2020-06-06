import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import HorizontalStepIndicator from './HorizontalStepIndicator';
import VerticalStepIndicator from './VerticalStepIndicator';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<number>(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === 0 ? styles.selected : styles.unSelected,
          ]}
          onPress={() => setCurrentPage(0)}
        >
          <Text style={styles.buttonLabel}>{'Horizontal'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === 1 ? styles.selected : styles.unSelected,
          ]}
          onPress={() => setCurrentPage(1)}
        >
          <Text style={styles.buttonLabel}>{'Vertical'}</Text>
        </TouchableOpacity>
      </View>
      {currentPage === 0 ? (
        <HorizontalStepIndicator />
      ) : (
        <VerticalStepIndicator />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 16,
  },
  buttonContainer: {
    flexShrink: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  selected: {
    backgroundColor: 'rgb(101, 121, 191)',
  },
  unSelected: {
    backgroundColor: 'rgba(101, 121, 191, 0.3)',
  },
  buttonLabel: {
    color: '#ffffff',
  },
});
