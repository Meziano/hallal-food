import {Alert, Button, Text, View} from 'react-native';
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {createUser} from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native"

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const submit = async () => {
        const { name, email, password } = form;
        if(!name || !email || !password) return Alert.alert('Error', 'Please enter valid name, email address & password.');
        setIsSubmitting(true)
        try {
            await createUser({ name, email, password });
            router.replace('/');
        } catch(error: any) {
            Alert.alert('Error', error.message);
            Sentry.captureEvent(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="bg-white flex-1 gap-10 p-5 mt-5">
            <CustomInput
                placeholder="Enter Your Full Name"
                value={form.name}
                onChangeText={(text) => setForm((prevState) => ({... prevState, name:text}))}
                label="Full Name"
            />
            <CustomInput
                placeholder="Enter Your Email"
                value={form.email}
                onChangeText={(text) => setForm((prevState) => ({... prevState, email:text}))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter Your Password"
                value={form.password}
                onChangeText={(text) => setForm((prevState) => ({... prevState, password:text}))}
                label="Password"
                secureTextEntry={true}
            />
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className='flex flex-row justify-center mt-5 gap-2'>
                <Text className="base-regular text-gray-300">Already have an Account?</Text>
                <Link href='/sign-in' className="base-bold text-primary">Sign In</Link>
            </View>
        </View>
    );
};

export default SignUp;
