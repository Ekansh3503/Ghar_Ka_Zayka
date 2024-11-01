import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useFavorites } from "../context/FavoriteContext";
import { useNavigation } from "@react-navigation/native";
import RecipeCard from "../components/RecipeCard";
import { Colors } from "../constants/Colors";

const FavouriteScreen = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe });
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No favorite recipes yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <RecipeCard
          image={item.image}
          title={item.title}
          readyInMinutes={item.readyInMinutes}
          veryPopular={item.veryPopular}
          vegetarian={item.vegetarian}
          category={item.category}
          onPress={() => handleRecipePress(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: Colors.primary,
  },
});

export default FavouriteScreen;
