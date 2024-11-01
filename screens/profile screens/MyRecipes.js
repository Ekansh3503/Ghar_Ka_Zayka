import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, SafeAreaView, Text, View, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import RecipeCard from '../../components/RecipeCard'; 
import { Colors } from '../../constants/Colors';  

const MyRecipeScreen = ({ navigation }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const fetchRecipes = async () => {
            const user = auth.currentUser;

            if (!user) {
                setError('You must be logged in to view your recipes.');
                setLoading(false);
                return;
            }

            try {
                const q = query(collection(db, 'recipes'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                
                const recipesList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setRecipes(recipesList);
            } catch (e) {
                setError('Failed to fetch recipes. Please try again later.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [auth.currentUser]);

    const confirmDeleteRecipe = (recipeId) => {
        Alert.alert(
            "Delete Recipe",
            "Are you sure you want to delete this recipe?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => handleDeleteRecipe(recipeId),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const handleDeleteRecipe = async (recipeId) => {
        try {
            await deleteDoc(doc(db, 'recipes', recipeId));

            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== recipeId));
        } catch (e) {
            console.error("Error deleting recipe: ", e);
            Alert.alert("Error", "Failed to delete the recipe. Please try again.");
        }
    };

    const renderRecipe = ({ item }) => (
        <View style={styles.recipeCardContainer}>
            <RecipeCard
                image={item.photo || null}  
                title={item.title}
                readyInMinutes={item.cookTime}
                veryPopular={item.veryPopular}  
                vegetarian={item.vegetarian}  
                category={item.category}  
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => confirmDeleteRecipe(item.id)}  
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {recipes.length === 0 ? (
                <Text style={styles.noRecipesText}>No recipes found.</Text>
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={renderRecipe}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryWhite,
        padding: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginVertical: 20,
    },
    noRecipesText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        paddingBottom: 100, 
    },
    recipeCardContainer: {
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    deleteButton: {
        marginTop: 0,
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MyRecipeScreen;
