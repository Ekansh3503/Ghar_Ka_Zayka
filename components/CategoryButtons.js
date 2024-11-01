import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';

const categoryImages = {
  Indian: 'https://i.pinimg.com/474x/48/ab/36/48ab36fa3806509b26c07a3cb4c041f9.jpg',
  French: 'https://i.pinimg.com/564x/54/9b/31/549b311db80a4c9c292334aeb1468e2e.jpg',
  Italian: 'https://i.pinimg.com/236x/73/2d/8f/732d8f710616251d3154db0ed3c1688b.jpg',
  Mexican: 'https://i.pinimg.com/564x/db/d6/22/dbd6228fabb879fbe56c861c24d64838.jpg',
  Thai: 'https://i.pinimg.com/564x/ba/99/97/ba9997893294defa676ced70c6eab7b9.jpg',
  Chinese: 'https://i.pinimg.com/736x/b9/f1/91/b9f191867b07b25522420e760a9be1b9.jpg',
  American: 'https://i.pinimg.com/736x/fb/a3/30/fba33088330c4dc14b809e6377a42a5b.jpg',
  Vegan: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOI13BNK_LBqYaSZuGFVpgc-Vn2fXEZvPTjA&s',
  Breakfast: 'https://media.istockphoto.com/id/1692266611/photo/grand-slam-breakfast-with-pancakes-bacon-eggs-and-toast.webp?b=1&s=170667a&w=0&k=20&c=k4uKyukbt_hx1NBLx9dW_PSr6Wh3yiQkyrVAaRyrw-M=',
  Lunch: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0YAlVEGkVWvIPzkXK99ShyFpC31_XjYSvy64r7ppw4jcsISITzuzklHjgKw&s',
  Dinner: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/ca/a3.jpg',
  Vegetarian: 'https://cbx-prod.b-cdn.net/COLOURBOX61080991.jpg?width=800&height=800&quality=70',
};

const CategoryButtons = ({ categories, onPressCategory, activeCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.button, item === activeCategory ? styles.activeButton : styles.inactiveButton]}
            onPress={() => onPressCategory(item)}
          >
            <Image source={{ uri: categoryImages[item] }} style={styles.image} />
            <Text style={[styles.buttonText, item === activeCategory ? styles.activeButtonText : styles.inactiveButtonText]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: hp('2%'),
      paddingHorizontal: wp('2%'),
    },
    buttonContainer: {
      alignItems: 'center',
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: wp('3%'),
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.2%'),
      marginRight: wp('2%'),
      justifyContent: 'center',
      borderColor: Colors.primary,
    },
    activeButton: {
      backgroundColor: Colors.primary,
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    image: {
      width: wp('8%'), 
      height: wp('8%'), 
      marginRight: wp('2%'),
    },
    buttonText: {
      fontSize: RFPercentage(2.2),
      fontWeight: 'bold',
    },
    activeButtonText: {
      color: Colors.primaryWhite,
    },
    inactiveButtonText: {
      color: Colors.primary,
    },
  });
  

export default CategoryButtons;
