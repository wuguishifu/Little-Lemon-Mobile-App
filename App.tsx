import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./constants/colors";
import Landing from "./screens/Landing";
import { DataProvider, useData } from "./context/DataContext";
import { ActivityIndicator, View } from "react-native";
import React from "react";
import Menu from "./screens/Menu";
import Profile from "./screens/Profile";
import RemixIcon from "react-native-remix-icon";

export type RootStackParamList = {
    Landing: undefined;
    Menu: undefined;
    Profile: undefined;

    Tabs: undefined;
    Boot: undefined;
};

export type MainStackNavigator = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <DataProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Boot" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Boot" component={Boot} />
                    <Stack.Screen name="Landing" component={Landing} />
                    <Stack.Screen name="Tabs" component={TabNavigator} options={{ gestureEnabled: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </DataProvider>
    );
};

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Menu"
            screenOptions={{
                tabBarStyle: [{
                    backgroundColor: colors.primary,
                    borderTopWidth: 0
                }],
                tabBarActiveTintColor: colors.accent,
                lazy: true,
                tabBarShowLabel: false,
                headerShown: false,
            }}>
            <Tab.Screen name="Menu" component={Menu} options={{
                tabBarIcon: ({ color, size }) => (
                    <RemixIcon name="ri-menu-line" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                    <RemixIcon name="ri-user-3-fill" size={size} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}

function Boot() {
    const { email, name } = useData();
    const navigation = useNavigation<MainStackNavigator>();

    React.useEffect(() => {
        if (email === null || name === null) {
            navigation.navigate('Landing');
        } else if (name && email) {
            navigation.navigate('Tabs');
        }
    }, [email, name]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
        </View>
    );
}