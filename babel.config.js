module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      
      ['babel-plugin-styled-components', { displayName: true }],
      ['module-resolver', {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: { '@': './src' },
      }],
      'react-native-reanimated/plugin'
    ]
  };
};
