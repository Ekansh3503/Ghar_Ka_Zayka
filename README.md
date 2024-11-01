# GharKaZayka

**GharKaZayka** is a recipe-sharing mobile application built with React Native, Firebase, and Firestore. It allows users to upload, browse, and share recipes. The app also provides personalized recommendations through a chatbot and fetches recipes from an external API.

## Features

- **User Authentication**: Users can sign up and log in via Google authentication or email/password using Firebase.
- **Recipe Sharing**: Users can upload their own recipes, including details such as ingredients, instructions, and images.
- **Browse Recipes**: Users can browse a variety of recipes fetched from an API and other users.
- **Favorites**: Users can mark recipes as favorites and save them for quick access.
- **Chatbot**: A built-in chatbot helps users find recipes based on their preferences and questions.
- **Location-based Features**: Users can select their location (country, state, city) and have it stored in Firebase. Recipes can be uploaded with location-based tags.
  
## Tech Stack

- **React Native**: Mobile app framework for building cross-platform applications.
- **Firebase Authentication**: Google and email-based authentication for user accounts.
- **Firestore**: Used as a database to store user recipes and other data.
- **AsyncStorage**: Used for storing user preferences and selected location data locally.
- **External API**: Spoonacular for fetching recipes from a third-party recipe database, Country State City Api for fetching country,state and city names, Gemini for integrating chatbot.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- Firebase account with Firestore enabled

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vishalmaurya1103/GHAR_KA_ZAYKA.git
   cd GHAR_KA_ZAYKA
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Firebase Setup**:
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Google, Email/Password) and **Firestore** in Firebase.
   - Download the `google-services.json` file for Android and `GoogleService-Info.plist` for iOS, and place them in the respective folders (`android/app` and `ios`).

4. **Environment Variables**:
   - Add any required API keys and Firebase configuration in a `.env` file.

5. **Run the Application**:

   ```bash
   npm run android   # For Android
   npm run ios       # For iOS
   ```

## Core Features

- **Recipe Uploading**: Users can upload new recipes, which are stored in Firestore with relevant fields like recipe name, ingredients, steps, and location.
- **Fetching Recipes**: Recipes are fetched from Firestore and the external API, displayed in various categories, and searchable.
- **Favorite Management**: Users can add and remove recipes from their favorites using AsyncStorage.
- **Location Handling**: The app saves users' location preferences using AsyncStorage and Firebase, which can be used for location-specific recipe recommendations.

## Screenshots

![Home Screen](screenshots/home-screen.png)
*The home screen displaying popular recipes*

![Recipe Details](screenshots/recipe-detail.png)
*Detailed view of a selected recipe*

![Chatbot](screenshots/chatbot.png)
*Chatbot offering recipe suggestions*

## Future Improvements

- Add **in-app notifications** for recipe uploads.
- Implement **real-time chat** for users to interact with other recipe creators.
- Enable **recipe rating** and **reviews**.

## License

This project is licensed under the MIT License.
