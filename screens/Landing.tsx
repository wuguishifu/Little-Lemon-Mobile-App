import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigator } from "../App";
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import strings from "../constants/strings";
import Input from "../components/Input";
import Button from '../components/Button';
import { useData } from '../context/DataContext';

export default function Landing() {
    const { updateName, updateEmail } = useData();

    const navigation = useNavigation<MainStackNavigator>();

    const [name, setName] = React.useState<{ first: string, last: string }>({ first: '', last: '' });
    const [email, setEmail] = React.useState('');

    const onConfirm = React.useCallback(() => {
        if (name.first.length > 0 && name.last.length > 0 && email.length > 0) {
            updateName(name);
            updateEmail(email);
            navigation.navigate('Tabs');
        }
    }, [name, email]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: colors.primary }}>
                <View style={{ paddingHorizontal: 16, flex: 1, width: '100%', alignItems: 'center' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 0.7 }}>
                        <Text style={styles.header}>{strings.appName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={{ alignItems: 'flex-start', flex: 1 }}>
                            <Text style={styles.subtitle}>{strings.location}</Text>
                            <Text style={styles.blurb}>{strings.blurb}</Text>
                        </View>
                        <View style={{ width: 16 }} />
                        <Image style={{ width: '33%', aspectRatio: 1 / 1.75 }} source={require('../assets/logo-full.png')} />
                    </View>
                    <View style={{ flex: 1, width: '100%', gap: 16 }}>
                        <Input label="First Name" value={name.first} onChange={e => setName(p => ({ ...p, first: e }))} inputMode="text" mode='dark' />
                        <Input label="Last Name" value={name.last} onChange={e => setName(p => ({ ...p, last: e }))} inputMode="text" mode='dark' />
                        <Input label="Email" value={email} onChange={setEmail} inputMode="text" mode='dark' />
                        <Button style={{ marginTop: 16 }} title='Register' onPress={onConfirm} enabled={name.first.length > 0 && name.last.length > 0 && email.length > 0} />
                    </View>
                    <View style={{ flex: 1 }} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 44,
        fontWeight: 'bold',
        color: colors.accent,
    },
    subtitle: {
        fontSize: 32,
        fontWeight: 'normal',
        color: colors.primaryForeground
    },
    blurb: {
        fontSize: 20,
        fontWeight: 'normal',
        color: colors.primaryForeground
    }
});