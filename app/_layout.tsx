import {Slot, SplashScreen, Stack} from "expo-router";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://aa79b98284ce8d451f50916b521639cf@o4510178691383296.ingest.de.sentry.io/4510178692694096',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
import "./globals.css"
import useAuthStore from "@/store/auth.store";
import {useEffect} from "react";
import {account} from "@/lib/appwrite";
// import { useFonts } from "expo-font";


const RootLayout = () => {
    const { isLoading, fetchAuthenticatedUser } = useAuthStore();
    useEffect( () => {
        fetchAuthenticatedUser()
    }, []);
    console.log("isLoading: ", isLoading );
    if(isLoading) return null;
    return <Stack screenOptions={{headerShown: false} } />
};
export default Sentry.wrap(RootLayout as React.FC);
// Sentry.showFeedbackWidget();
