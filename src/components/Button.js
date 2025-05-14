import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button(title, OnPress){
    return (
        <TouchableOpacity style={styles.button} OnPress={OnPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    text:{textAlign: "center"}
});