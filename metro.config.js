// module.exports = {
//   resolver: {
//     assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'gltf'],
//   },
// };


const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts = [...defaultConfig.resolver.assetExts, 'db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'gltf', 'glb'];

module.exports = defaultConfig;