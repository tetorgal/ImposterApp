module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json', '.d.ts'],
          alias: {
            '@components': './components',
            '@lib': './lib',
            '@assets': './assets',
            '@screens': './app',
          },
        },
      ],
    ],
  };
};
