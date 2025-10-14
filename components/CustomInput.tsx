import { Text, TextInput, View } from "react-native";
import { CustomInputProps } from "@/type";
import { useState } from "react";
import cn from "clsx";

const CustomInput = ({
  placeholder = "Enter Text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <View className="w-full">
      <Text>{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#888"}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn('input', isFocused ? 'border-primary' : 'border-gray-300')}
      />
    </View>
  );
};

export default CustomInput;
