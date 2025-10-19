import { Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";
import {router, useLocalSearchParams} from "expo-router";
import {images} from "@/constants";
import {useDebouncedCallback} from "use-debounce";
import {buildUndefinedNode} from "@babel/types";

const SearchBar = () => {
    const searchParams = useLocalSearchParams<{query?: string}>()
    const [query, setQuery] = useState(searchParams.query)

    // const debouncedSearch = useDebouncedCallback(
    //     (text: string) => router.push(`/search?query=${text}`),
    //     500
    // )

    const handleSearch = (text: string) => {
        setQuery(text);
        if(!text) router.setParams({ query: undefined });
        // debouncedSearch(text);
    }

    const handleSubmit = () => {
        if(query?.trim()) router.setParams({ query});
    }

    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholderTextColor='#A0A0A0'
                placeholder="Search for pizzas, burgers, .."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit}
                returnKeyType='search'
            />
            <TouchableOpacity className="pr-5" onPress={() => router.setParams({ query})}>
                <Image source={images.search} className="size-6" resizeMode="contain" tintColor='#5D5F6D'  />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
