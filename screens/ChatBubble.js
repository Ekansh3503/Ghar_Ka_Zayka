import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Colors } from '../constants/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const ChatBubble = ({ role, text, onSpeech }) => {
    return (
        <View
            style={[
                styles.chatItem,
                role === "user" ? styles.userChatItem : styles.modelChatItem,
                { maxWidth: wp("80%") },
            ]}
        >
            <Text style={styles.chatText}>{text}</Text>
            {role === "model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons
                        name="volume-high-outline"
                        size={RFPercentage(3)}
                        color="#fff"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem: {
        marginBottom: hp("1.5%"),
        padding: wp("3%"),
        borderRadius: wp("5%"),
        position: "relative",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    userChatItem: {
        alignSelf: "flex-end",
        backgroundColor: Colors.primary,
    },
    modelChatItem: {
        alignSelf: "flex-start",
        backgroundColor: "#2c3e50",
    },
    chatText: {
        color: "#fff",
        fontSize: RFPercentage(2.5),
    },
    speakerIcon: {
        position: "absolute",
        bottom: hp("1%"),
        right: wp("1%"),
    },
});

export default ChatBubble;
