import { Text, View, StyleSheet } from "react-native";

export default function Header(){
    return (
        <View style={styles.header}>
            <Text style={styles.title}>📄 Redação Inteligênte </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{ 
        backgroundColor: "#cd6edb", 
        padding: 20},
    title:{ color: "white", fontSize: 24, textAlign: "center"}
});