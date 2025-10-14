import {ActivityIndicator, TouchableOpacity, Text, View} from 'react-native';
import {CustomButtonProps} from "@/type";
import cn from "clsx";


const CustomButton = ({   onPress,
                          title = "Click me",
                          style,
                          leftIcon,
                          textStyle,
                          isLoading = false
                      }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={cn('custom-btn', style)} onPress={onPress}>
            {leftIcon}
            <View className='flex-center flex-row'>
                { isLoading ? (
                    <ActivityIndicator size='small' color='white' />
                    ):(
                    <View className='flex-center flex-row'>
                        <Text className={cn('text-white paragraph-semibold', textStyle)}>
                            { title }
                        </Text>
                    </View>
                    )
                }
            </View>
         </TouchableOpacity>
    );
};

export default CustomButton;
/*
* */