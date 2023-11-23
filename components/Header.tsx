import { Image, Text, View } from "react-native";
import colors from "../constants/colors";

export default function Header({ title }: { title: string }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.primary, paddingBottom: 16 }}>
            <View style={{ flex: 0.1 }} />
            <Text style={{ fontWeight: 'bold', fontSize: 28, color: colors.primary, textAlign: 'center', flex: 0.8 }}>{title}</Text>
            <View style={{ flex: 0.1, alignItems: 'center' }}>
                <Image source={require('../assets/user_default.png')} style={{ width: 32, height: 32, borderRadius: 16 }} />
            </View>
        </View>
    );
};