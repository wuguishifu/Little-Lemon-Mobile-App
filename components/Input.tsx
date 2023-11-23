import { View, Text, TextInput, StyleSheet, InputModeOptions, ViewStyle, StyleProp } from 'react-native';
import colors from '../constants/colors';

type InputProps = {
    label: string;
    value: string;
    onChange: (text: string) => void;
    inputMode?: InputModeOptions;
    mode?: 'dark' | 'light';
    error?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function Input(props: InputProps) {
    const { label, value, onChange, inputMode = 'text' } = props;

    return (
        <View style={[styles.container, props.style]}>
            <Text style={[styles.label, { color: props.error ? 'red' : props.mode === 'dark' ? 'white' : 'black' }]}>{label}</Text>
            <TextInput
                inputMode={inputMode}
                style={styles.input}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: colors.background,
        borderRadius: 10,
        paddingHorizontal: 16,
        borderWidth: 1
    }
});