import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import RecipeCard from './RecipeCard';
import { Colors } from '../constants/Colors';

const RecipeListComponent = ({ recipes, loading, error, search, activeCategory, navigateToRecipeDetail }) => {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && recipes.length === 0 && search.length > 2 && (
        <Text style={styles.noRecipesText}>No recipes found. Try another search.</Text>
      )}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            image={item.image}
            title={item.title}
            readyInMinutes={item.readyInMinutes}
            veryPopular={item.veryPopular}
            vegetarian={item.vegetarian}
            category={search.length > 2 ? 'Search Result' : activeCategory}
            onPress={() => navigateToRecipeDetail(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  noRecipesText: {
    color: Colors.primaryBlack,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default RecipeListComponent;
