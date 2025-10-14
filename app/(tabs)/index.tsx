import { images, offers } from "@/constants";
import cn from "clsx";
import { Image, Pressable, Text, View } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/store/auth.store";
import {account} from "@/lib/appwrite";


const Index = () => {
    const { user } = useAuthStore()
    console.log("User: ", JSON.stringify(user, null, 2))
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-between flex-row w-full my-5 px-5">
          <View className="flex-start">
            <Text className="small-bold text-primary">DELIVER TO</Text>
            <Image
              source={images.arrowDown}
              className="size-3"
              resizeMode="contain"
            />
          </View>
        </View>
        <FlatList
          data={offers}
          renderItem={({ item, index }) => {
            const isEven = index % 2 === 0;
            return (
              <View>
                <Pressable
                    className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                    style={{ backgroundColor: item.color}}
                    android_ripple={{ color: "#ffff22" }}
                >
                  {({ pressed }: { pressed: boolean }) => (
                    <>
                      <View className="h-full w-1/2 ">
                        <Image
                          source={item.image}
                          className="size-full"
                          resizeMode={"contain"}
                        />
                      </View>

                        <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')}>
                        <Text className="h1-bold text-white leading-tight">
                          {item.title}
                        </Text>
                        <Image
                          source={images.arrowRight}
                          className="size-10"
                          resizeMode={"contain"}
                          tintColor="#FFFFFF"
                        />
                      </View>
                    </>
                  )}
                </Pressable>
              </View>
            );
          }}
          contentContainerClassName="pb-28 px-5"
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Index;
/*

contentContainerClassName="pb-28 px-5"
renderItem={
            ({ item, index }) => {
                const isEven = index % 2 === 0;
                return (
                    <View>
                      <Pressable className={cn("offer-card", isEven ? "flex-row-reverse" : "flex-row")}
                                     style={{ backgroundColor: item.color}}
                                     android_ripple={{color: "#ffff22"}}>

                        {({ pressed }) => (
                            <>
                                <View className="h-full w-1/2 ">
                                    <Image source={item.image} className="size-full" resizeMode={"contain"} />
                                </View>
                                <View className={cn("offer-card__info", isEven ? 'pl-10': 'pr-10')}>
                                    <Text className="h1-bold text-white leading-tight">{item.title}</Text>
                                    <Image source={images.arrowRight} className="size-10" resizeMode={"contain"} tintColor="#FFFFFF" />
                                </View>
                            </>

                        )}
                      </Pressable>
                    </View>
                );
            }
          }
* */
