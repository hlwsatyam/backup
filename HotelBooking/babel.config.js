module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ["react-native-paper/babel", { /* any options for react-native-paper plugin */ }]
    ],
  };
};
