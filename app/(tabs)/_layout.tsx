import {Redirect, Stack} from "expo-router";



const _layout = () => {
    const isAuthenticated = false
    if (!isAuthenticated) return <Redirect href="/sign-in" />
    return (
        <Stack screenOptions={{headerShown: false} } />
    );
};

export default _layout;
