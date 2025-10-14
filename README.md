# React Native with Expo

Generate a project using:

   ```
   npx create-expo-app
   ```
For more information see [here](https://www.npmjs.com/package/create-expo-app)
To make it simple use: `npx create-expo-app@latest ./`

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


## Add style
For a complete referece, see [here](https://www.nativewind.dev/docs/getting-started/installation)
   ```
   npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
   ```

### Setup Tailwind CSS 
Bei running 
   ```
   npx tailwindcss  init
   ```
This will generate the configuration file tailwind.config.js,

Add the paths to all of your component files in your tailwind.config.js file.

   ```
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     // NOTE: Update this to include the paths to all files that contain Nativewind classes.
     content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
     presets: [require("nativewind/preset")],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
Finally create a new file within the app folder and call it `globals.css` 
and within it we have to import three things or rather add three Tailwind directives
   ```
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
after that we have to set up the Babel preset so create a new file in the root of
your directory called `babel.config.js` and paste

   ```
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: [
         ["babel-preset-expo", { jsxImportSource: "nativewind" }],
         "nativewind/babel",
       ],
     };
   };
   ```
we also have to add or modify the Metro config
   ```
   npx expo customize metro.config.js
   ```
and modify it, pasting the following: 

   ```
   const { getDefaultConfig } = require("expo/metro-config");
   const { withNativeWind } = require('nativewind/metro');
   
   const config = getDefaultConfig(__dirname)

   module.exports = withNativeWind(config, { input: './globals.css' })
   ```
Import ./app/globals.css in _layout.tsx

   ```
   import "./global.css"
   ```



## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
