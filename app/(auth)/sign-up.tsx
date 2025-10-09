import {Button, Text, View} from 'react-native';
import {router} from "expo-router";

const Register = () => {
    return (
        <View>
            <Text>SignUp</Text>
            <Button title="Sign in" onPress={() => router.push("/sign-in")} />
        </View>
    );
};

export default Register;
