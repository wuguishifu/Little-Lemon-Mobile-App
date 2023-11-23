import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import colors from '../constants/colors';

type ButtonProps = {
    title: string;
    onPress: () => void;
    enabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export default function Button(props: ButtonProps) {
    const { title, onPress, enabled = true } = props;

    const [pressed, setPressed] = React.useState(false);

    return (
        <TouchableWithoutFeedback
            disabled={!enabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={onPress}
        >
            <View style={[styles.container, { opacity: enabled ? pressed ? 0.8 : 1 : 0.5 }, props.style]}>
                <Text style={styles.label}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.accent,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.accentForeground
    }
});