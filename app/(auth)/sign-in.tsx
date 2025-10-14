import {Alert, Button, Text, View} from "react-native";
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {signIn} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native"


const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });

    const submit = async () => {
        const { email, password } = form;
        if(!email || !password) return Alert.alert('Error', 'Please enter valid email address & password.');
        setIsSubmitting(true)
        try {
            await signIn({ email, password });
            console.log('Success', 'User signed in Successfully.');
            router.replace('/');
        } catch(error: any) {
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
    <View className="w-full bg-white flex-1 gap-10 p-5 mt-5">
        <CustomInput
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(text) => setForm((prevState) => ({... prevState, email:text}))}
            label="Email"
            keyboardType="email-address"
        />
        <CustomInput
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(text) => setForm((prevState) => ({... prevState, password:text}))}
            label="Password"
            secureTextEntry={true}
        />
        <CustomButton
            title="Sign In"
            isLoading={isSubmitting}
            onPress={submit}
        />
        <View className='flex flex-row justify-center mt-5 gap-2'>
            <Text className="base-regular text-gray-300">Don't have an Account?</Text>
            <Link href='/sign-up' className="base-bold text-primary">Sign Up</Link>
        </View>
    </View>

  );
};

export default Login;
