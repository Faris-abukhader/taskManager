import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home';
import GettingStart from './screens/gettingStart';
import categoryModel from './screens/categoryModel';
import { useStore } from './zustand/todoStore';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator()

export default function App() {
  const { initialize, isInitialized } = useStore(state => state)
  useEffect(() => {
    initialize()
  }, [])

  if (!isInitialized) {
    return <ActivityIndicator />
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="getting start" component={GettingStart} />
        <Stack.Screen options={{ headerShown: false }} name="home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="category" component={categoryModel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}