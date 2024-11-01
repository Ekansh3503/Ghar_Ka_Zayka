import React, { useState, useEffect, useRef } from 'react';
import { Text, Image, StyleSheet, ScrollView, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IngredientsList from '../components/IngredientsList';
import InstructionsList from '../components/InstructionsList';
import NutritionInfo from '../components/NutritionInfo';
import RecipeInfoItem from '../components/RecipeInfoItem';
import IconButton from '../components/IconButton';
import { useFavorites } from '../context/FavoriteContext';
import RecipeDescription from '../components/RecipeDescription';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params || {};
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFav, setIsFav] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsFav(isFavorite(recipe.id));
  }, [recipe.id, isFavorite]);

  const changeFavoriteStatusHandler = () => {
    if (isFav) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
    setIsFav(!isFav);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={changeFavoriteStatusHandler}
          icon={isFav ? 'heart' : 'heart-outline'}
          color="#f50909"
          size={24}
        />
      ),
    });
  }, [navigation, changeFavoriteStatusHandler, isFav]);

  if (!recipe || Object.keys(recipe).length === 0) {
    return <Text>Loading recipe...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.photo || recipe.image || '' }} style={styles.image} />
      <Text style={styles.title}>{recipe.title || 'No Title'}</Text>

      {/* Recipe Information */}
      <View style={styles.infoGrid}>
        <RecipeInfoItem icon="watch-later" text={`${recipe.cookTime || recipe.readyInMinutes || 0} mins`} />
        <RecipeInfoItem icon="category" text={recipe.category || 'Unknown'} />
        <RecipeInfoItem icon="local-fire-department" text={recipe.difficulty || 'Medium'} />
        <RecipeInfoItem icon="local-dining" text={recipe.diet || 'Non-Vegetarian'} />
        <RecipeInfoItem icon="people" text={`${recipe.servings || 0} servings`} />
        <RecipeInfoItem icon="fitness-center" text={`Calories: ${recipe.calories || 0} cal`} />
      </View>
      
        {recipe.location && (
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={24} color={Colors.primary} style={styles.locationIcon} />
            <Text style={styles.locationTitle}>
              {`${recipe.location.city || ''}${recipe.location.city ? ', ' : ''}${recipe.location.state || ''}${recipe.location.state ? ', ' : ''}${recipe.location.country || ''}`}
            </Text>
          </View>
        )}

      {/* Recipe Description */}
      <RecipeDescription description={recipe.description || recipe.summary || 'No Description Available'} />

      {/* Ingredients */}
      <IngredientsList ingredients={recipe.ingredients || recipe.extendedIngredients || []} />

      {/* Instructions */}
      <InstructionsList instructions={recipe.instruction || recipe.analyzedInstructions?.[0]?.steps || []} />

      {/* Nutrition Info */}
      <NutritionInfo recipe={recipe} />

      {/* Recipe Video (if exists) */}
      {recipe.video && (
        <View style={styles.videoContainer}>
          <Text style={styles.videoTitle}>Recipe Video :</Text>
          <Video
            ref={videoRef}
            source={{ uri: recipe.video }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      )}

      <View style={{ marginBottom: '5%' }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    padding: wp('5%'),
  },
  image: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'cover',
    borderRadius: wp('2%'),
  },
  title: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: Colors.primary,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  videoContainer: {
    marginTop: 16,
    width: '100%',
  },
  videoTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.primary,
  },
  video: {
    width: wp('90%'),
    height: hp('25%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
    padding: wp('3%'),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: wp('5%'),
    backgroundColor: '#edf2fb',
  },
  locationIcon: {
    marginRight: wp('2%'),
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RecipeDetail;
