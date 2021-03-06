// @flow

const FIREBASE_PRODUCTION = {
  apiKey: "AIzaSyDudKhN_MabmGH5EUNv7DPmBZ4ptMhFVog",
  authDomain: "idee-app.firebaseapp.com",
  databaseURL: "https://idee-app.firebaseio.com",
  projectId: "idee-app",
  storageBucket: "idee-app.appspot.com",
  messagingSenderId: "394685923584",
}

const FIREBASE_DEV = {
  apiKey: "AIzaSyAmsLWMStkiaNlh5NpLm3yYabQ5aC6WU6I",
  authDomain: "idee-app-dev.firebaseapp.com",
  databaseURL: "https://idee-app-dev.firebaseio.com",
  projectId: "idee-app-dev",
  storageBucket: "",
  messagingSenderId: "854949127425",
}

console.log(process.env.REACT_APP_FIREBASE_CONFIG)

export const CONFIG = {
  HOSTNAME: "idee.mindhouse.io",
  ANALYTICS_ID: "UA-117937544-7",
  firebase:
    process.env.REACT_APP_FIREBASE_CONFIG === "production"
      ? FIREBASE_PRODUCTION
      : FIREBASE_DEV,
}
