import { StatusBar } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { GluestackUIProvider } from "@gluestack-ui/themed";

import { Loading } from "@components/Loading";

import { AuthContextProvider } from "@contexts/auth-context"; 

import { Routes } from "@routes/index";

import { config } from "./config/gluestack-ui.config";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GluestackUIProvider config={config}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
