import {Slot, Stack} from "expo-router";
import "./globals.css"
/* import {StatusBar} from "expo-status-bar"; */


const RootLayout = () => {
  return (
      <>

          {/*
          <StatusBar style="auto" />
          <Stack screenOptions={{
                headerStyle: { backgroundColor: theme.navBackground },
                headerTintColor: theme.title, headerShown: false}}>*/}
              {/* Groups */}
              {/*<Stack.Screen name="(auth)" options={{ headerShown: false }} />
             <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />*/}
              {/* Individual Screens */}
              {/*<Stack.Screen name="index" options={{title: "Home"}} />*/}
          <Stack screenOptions={{headerShown: false} } />
      </>
  )
}

export default RootLayout;