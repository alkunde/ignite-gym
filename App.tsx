
import { View, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#323238' }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {fontsLoaded ? <View />: <View />}
      </View>
    </NativeBaseProvider>
  );
}