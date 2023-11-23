import { View, Text, Image } from "react-native";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useData } from "../context/DataContext";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigator } from "../App";

export default function Profile() {
    const { name, updateName, email, updateEmail, updateFirst, updateLast, logout: _logout } = useData();

    const navigation = useNavigation<MainStackNavigator>();

    const logout = () => {
        _logout();
        navigation.popToTop();
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <Header title="Profile" />
                <View style={{ width: '100%', paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 28 }}>Personal Information</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Avatar</Text>
                    <Image source={require('../assets/user_default.png')} style={{ width: 100, height: 100, borderRadius: 132 }} />
                    <Input label="First Name" value={name?.first ?? ''} onChange={updateFirst} inputMode="text" mode='light' style={{ paddingTop: 16 }} />
                    <Input label="Last Name" value={name?.last ?? ''} onChange={updateLast} inputMode="text" mode='light' style={{ paddingTop: 16 }} />
                    <Input label="Email" value={email ?? ''} onChange={updateEmail} inputMode="text" mode='light' style={{ paddingTop: 16 }} />
                    <Button title="Log Out" onPress={logout} style={{ marginTop: 32 }} />
                </View>
            </SafeAreaView>
        </View>
    );
};