import {Redirect, Stack, Tabs} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {TabBarIconProps} from "@/type";
import {Image, ImageSourcePropType, Text, View} from "react-native";
import {images} from "@/constants";
import {Ionicons} from "@expo/vector-icons";


import cn from "clsx";

interface Tab {
    title: string;
    name: string;
    focused: boolean;
    icon: keyof typeof images;
}

const tabs: Tab[] = [
    { title: "Home", name: "index", focused: true, icon: "home" },
    { title: "Search", name: "search", focused: true, icon: "search"},
    { title: "Cart", name: "cart", focused: false, icon: "bag" },
    { title: "Profile", name: "profile", focused: false, icon: "person" }
];

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
    <View className="tab-icon">
        <Image source={icon} className='size-5' resizeMode="contain" tintColor={ focused? '#FE8C00' : '#5D5F6D'} />
        <Text className={cn('text-sm font-bold', focused?'#FE8C00' : 'text-gray-200')}>{title}</Text>
    </View>
)


const TabLayout = () => {
    const { isAuthenticated }  = useAuthStore();
    console.log("isAuthenticated: ", isAuthenticated);
    if (!isAuthenticated) return <Redirect href="/sign-in" />

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                marginHorizontal: 10,
                height: 80,
                position: "absolute",
                bottom: 40,
                backgroundColor: "white",
                shadowColor: "#1A1A1A",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                elevation: 5,

            }
        }}>

            { tabs.map(tab => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <TabBarIcon title={tab.title} icon={images[tab.icon]} focused={focused} />
                        )
                    }}
                />
            ))}

        </Tabs>
    );
};

export default TabLayout;

/*
<Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => {
                        return <TabBarIcon
                            title="Home"
                            icon={images.home}
                            focused={focused}/>
                    }
                }}
            />
            <Tabs.Screen
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Search" icon={images.search} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => <TabBarIcon title="Profile" icon={images.person} focused={focused} />
                }}
            />

* */