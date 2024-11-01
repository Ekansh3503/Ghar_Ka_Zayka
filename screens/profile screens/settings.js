import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

export default function Settings() {
   
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}></Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('ChangePassword')
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon color="#fff" name="key" size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Change Password</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Location')
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                            <FeatherIcon
                                color="#fff"
                                name="navigation"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Location</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DeleteAccount');
                        }}
                        style={styles.row}>
                        <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
                            <FeatherIcon
                                color="#fff"
                                name="settings"
                                size={20} />
                        </View>

                        <Text style={styles.rowLabel}>Delete Account</Text>

                        <View style={styles.rowSpacer} />

                        <FeatherIcon
                            color="#C6C6C6"
                            name="chevron-right"
                            size={20} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    section: {
        paddingHorizontal: wp('6%'),
    },
    sectionTitle: {
        paddingVertical: hp('1.5%'), 
        fontSize: RFPercentage(1.6), 
        fontWeight: '600',
        color: '#9e9e9e',
        textTransform: 'uppercase',
        letterSpacing: wp('0.27%'), 
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: hp('6.5%'),
        backgroundColor: '#f2f2f2',
        borderRadius: wp('2%'), 
        marginBottom: hp('1.5%'), 
        paddingHorizontal: wp('3%'), 
    },
    rowIcon: {
        width: wp('8%'), 
        height: wp('8%'), 
        borderRadius: 9999,
        marginRight: wp('3%'), 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowLabel: {
        fontSize: RFPercentage(2.3), 
        fontWeight: '400',
        color: '#0c0c0c',
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    image: {
        width: wp('9%'), 
        height: wp('9%'), 
    },
});
