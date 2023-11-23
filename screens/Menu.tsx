import { View, Text, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React from 'react';
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import strings from "../constants/strings";

const images = [
    require('../assets/food0.jpeg'),
    require('../assets/food1.png'),
    require('../assets/food2.jpeg'),
    require('../assets/food3.jpeg'),
    require('../assets/food4.png'),
];

export default function Menu() {
    const [data, setData] = React.useState<{ id: number; title: string; price: string; category: { title: string }; }[]>();
    const [cat, setCat] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json')
            .then(response => response.json())
            .then(data => setData(data.menu))
            .catch(error => console.log(error));
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <SafeAreaView style={{ flex: 1, alignItems: 'center' }} edges={['top']}>
                <Header title="Menu" />
                <View style={{ width: '100%' }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, padding: 16 }}>
                                    <View style={{ alignItems: 'flex-start', flex: 1 }}>
                                        <Text style={styles.header}>{strings.appName}</Text>
                                        <Text style={styles.subtitle}>{strings.location}</Text>
                                        <Text style={styles.blurb}>{strings.blurb}</Text>
                                    </View>
                                    <View style={{ width: 16 }} />
                                    <Image style={{ width: '33%', aspectRatio: 1 / 1.75 }} source={require('../assets/logo-full.png')} />
                                </View>
                                <View style={{ width: '100%', padding: 16 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ORDER FOR DELIVERY!</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                                        {['Appetizers', 'Salads', 'Beverages'].map(i => <Pill t={i} key={i} selected={cat.includes(i)} toggleSelected={() => setCat(c => c.includes(i) ? c.filter(j => j !== i) : [...c, i])} />)}
                                    </View>
                                </View>
                            </>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => true}
                                tintColor={colors.primary}
                                colors={[colors.primary]}
                            />
                        }
                        data={cat.length ? data?.filter(i => cat.includes(i.category.title)) : data}
                        ItemSeparatorComponent={() => <View style={{ height: 1, width: '100%', backgroundColor: '#EDEFEE' }} />}
                        renderItem={({ item }) => (
                            <View style={{ width: '100%', paddingHorizontal: 16, paddingVertical: 8, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.primary }}>{item.title}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primary, opacity: 0.8, paddingVertical: 8 }}>{item.category.title}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primary, opacity: 0.8 }}>${item.price}.99</Text>
                                </View>
                                <Image style={{ width: 100, height: 100 }} source={images[item.id % 5]} />
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

function Pill({ t, selected, toggleSelected }: { t: string, selected: boolean, toggleSelected: () => void }) {
    return (
        <TouchableOpacity onPress={toggleSelected}>
            <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: selected ? colors.accent : '#EDEFEE', borderRadius: 16 }}>
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{t}</Text>
            </View>
        </TouchableOpacity>
    );
}

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