import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImageCollector from './screens/ImagePickerScreen';
import ImagePreview from './screens/ImagePreview';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageCollector">
        <Stack.Screen
          name="ImageCollector"
          component={ImageCollector}
          options={{title: 'Collect Images'}}
        />
        <Stack.Screen
          name="ImagePreview"
          component={ImagePreview}
          options={{title: 'Preview Images'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
