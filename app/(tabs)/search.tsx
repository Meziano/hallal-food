import {Text, View} from "react-native";
import {SafeAreaView } from "react-native-safe-area-context";
import useFetchData from "@/lib/useFetchData";
import { getMenuItems, getCategories } from "@/lib/appwrite";
import {MenuItem, Category, UseAppwriteOptions, GetMenuParams} from "@/type";
import { useState, useEffect} from "react";
import {useLocalSearchParams} from "expo-router";
import {FlatList, GestureHandlerRootView} from "react-native-gesture-handler";
import CartButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import cn from "clsx";
import SearchBar from "@/components/SearchBar";
import Filter from "@/components/Filter";

const Search = () => {
    // {category: '68f0e669001964675dad'}
    const { category, query, limit=50 } = useLocalSearchParams<{ category: string, query: string, limit: number }>()
    const { data, isLoading, error, refetch } = useFetchData<MenuItem[], GetMenuParams>({fn: getMenuItems, params: {category, query, limit}});
    const { data: categories } = useFetchData<Category[]>({fn: getCategories});

    useEffect(() => {
        console.log(`useffect category: ${category}`);
        refetch();
    }, [query, category, limit]);

    useEffect(() => {
        if (data) {
            console.log(`Fetched ${data?.length} MenuItems`)
        }
    }, [data]);

    useEffect(() => {
        if (categories) {
            console.log(`useEffect: Fetched ${categories?.length} Categories`)
        }
    }, [categories]);


    return (
        <GestureHandlerRootView>
        <SafeAreaView className='bg-white h-full'>
            <FlatList
                data={data}
                renderItem={({index, item}) => {
                    const isFirstRightColltem = index % 2 === 0;
                    return (
                        <View className={cn('flex-1 max-w-[48%]', !isFirstRightColltem ? 'mt-10' : 'mt-0')}>
                            <MenuCard item={item as MenuItem}/>
                        </View>
                    );}}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={({item}) => (
                    <View className='my-5 gap-5'>
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-['#FE8C00'] ">Search</Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="paragraph-semibold text-dark-100">Find your favorite food</Text>
                                </View>
                            </View>
                            <CartButton />
                        </View>
                        <SearchBar />
                        <Filter categories= { categories! }/>
                    </View>
                )}
                ListEmptyComponent={() => !isLoading && <Text>No items results</Text>}
            />
        </SafeAreaView>
        </GestureHandlerRootView>
    );
};

export default Search;
