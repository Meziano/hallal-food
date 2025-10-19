import {Platform, Text, TouchableOpacity, View} from 'react-native';
import {Category} from "@/type";
import {router, useLocalSearchParams} from "expo-router";
import { useState } from "react";
import {FlatList} from "react-native-gesture-handler";
import cn from "clsx";

const Filter = ( { categories }: {categories: Category[]} ) => {
    const searchParams = useLocalSearchParams();
    const [ active, setActive ] = useState(searchParams.category || 'all');

    const handlePress = (id: string) => {
        console.log(`id=${id}`);
        setActive(id);
        if(id==='all') router.setParams({category: undefined})
        else router.setParams({category: id});
    }

    const filterData: (Category | {id: string, name: string})[] = categories ? [{id:'all', name:'All'}, ... categories] : [{id:'all', name:'All'}];
    console.log(filterData.map((item) => item.id || item.$id));
    return (
        <FlatList
            data={filterData}
            keyExtractor={(item) => item.$id ?? item.id}
            horizontal
            horizontalScrollIndicator={false}
            contentContainerClassName='pb-3 gap-x-2'
            renderItem={({item}) => (
                <TouchableOpacity
                    key={item.$id ?? item.id}
                    className={cn('filter', active === (item.$id ?? item.id) ? 'bg-amber-500' : 'bg-white')}
                    style={ Platform.OS === 'android' ? {elevation : 5, shadowColor: '#A9A9A9'} : {}}
                    onPress={() => {
                        handlePress(item.$id ? item.$id : item.id)}
                    }
                >
                    <Text className={cn('body-medium', active === (item.$id ?? item.id) ? 'text-white':'text-gray-500')}>
                        { item.name}
                    </Text>
                </TouchableOpacity>
            )}

        />
    );
};

export default Filter;
