import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Chatbot = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const API_KEY = "AIzaSyCfeHi8BTclhubwhJEwhRGxCg1DZCpf1XU";

    const handleUserInput = async () => {
        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        setChat(updatedChat);
        setUserInput("");
        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat,
                }
            );

            let modelResponse =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            modelResponse = modelResponse.replace(/\*/g, "");

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updatedChatWithModel);
            }
        } catch (error) {
            console.error("Error calling Gemini Pro API:", error);
            console.error("Error response:", error.response);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            stop();
            setIsSpeaking(false);
        } else {
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={() => handleSpeech(item.parts[0].text)}
        />
    );

    return (
        <View style={[styles.container, { padding: wp('4%') }]}>
            <Text style={[styles.title, { fontSize: RFPercentage(3) }]}>
                Craving something tasty? Let's find it!
            </Text>
            <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
                ListFooterComponent={
                    loading && <ActivityIndicator style={styles.loading} color="#333" />
                }
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        { width: wp('92%'), height: hp('6%') },
                    ]}
                    placeholder="Type your message ..."
                    placeholderTextColor="#aaa"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <TouchableOpacity
                    style={[styles.button, { width: wp('20%'), height: hp('5%') }]}
                    onPress={handleUserInput}
                >
                    <Text style={[styles.buttonText, { fontSize: RFPercentage(2.2) }]}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp('3%'),
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    title: {
        fontWeight: "bold",
        color: "#333",
        marginBottom: hp('1%'),
        marginTop: hp('1%'),
        textAlign: "center",
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: hp('1%'),
    },
    input: {
        flex: 1,
        marginRight: wp('2%'),
        padding: wp('2%'),
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: wp('6%'),
        color: "#333",
        backgroundColor: "#fff",
    },
    button: {
        padding: wp('2%'),
        backgroundColor: Colors.primary,
        borderRadius: wp('6%'),
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    loading: {
        marginTop: hp('1%'),
    },
    error: {
        color: "red",
        marginTop: hp('1%'),
    },
});

export default Chatbot;
