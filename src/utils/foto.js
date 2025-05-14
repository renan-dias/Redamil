import * as ImagePicker from "expo-image-picker";

export async function imageChoice(){
    const result = await ImagePicker.launchImageLibraryAsync({base64:true});
    if (!result.canceled) return result.assets[0].base64;
    return null;
}