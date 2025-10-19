import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";

const MenuCard = ({item: { name, price, image_url  }}: MenuItem) => {
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`
    return (
        <TouchableOpacity className="menu-card" style={ Platform.OS === 'android' ? {elevation : 10, shadowColor: '#878787'} : {}}>
            <Image source={{ uri: image_url }} className="absolute size-32 -top-10" resizeMode='contain'/>
            <Text className="font-bold text-center text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">From {price}</Text>
            <TouchableOpacity>
                <Text className="paragraph-bold text-['#FE8C00']">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default MenuCard;
