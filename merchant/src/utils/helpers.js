const imageMap = {
  'apple 11': require('../assets/images/apple 11.jpg'),
  'apple X': require('../assets/images/apple X.jpg'),
  'techrader': require('../assets/images/techrader.jpg'),
  'grocery': require('../assets/images/grocery.jpg'),
  'lotion': require('../assets/images/lotion.jpg'),
  'lotion supplies': require('../assets/images/lotion supplies.jpg'),
  'hardware apliances': require('../assets/images/hardware apliances.jpg'),
  'suppliers': require('../assets/images/suppliers.jpg'),
  'cell smart': require('../assets/images/cell smart.jpg'),
  'flipmini mobile': require('../assets/images/flipmini mobile.jpg'),
  'foldable mobile': require('../assets/images/foldable mobile.jpg'),
  'google pixel': require('../assets/images/google pixel.jpg'),
  'nokia': require('../assets/images/nokia.jpg'),
  'pc batter': require('../assets/images/pc batter.jpg'),
  'phone batter': require('../assets/images/phone batter.jpg'),
  'motherboard': require('../assets/images/motherboard.jpg'),
  'ram': require('../assets/images/ram.jpg'),
  'rom': require('../assets/images/rom.jpg'),
  'com components': require('../assets/images/com components.jpg'),
  'computerparts': require('../assets/images/computerparts.jpg'),
  'banaan': require('../assets/images/banaan.jpg'),
  'eggs': require('../assets/images/eggs.jpg'),
  'eeggs': require('../assets/images/eeggs.jpg'),
  'fruits': require('../assets/images/fruits.jpg'),
  'veges': require('../assets/images/veges.jpg'),
  'spices': require('../assets/images/spices.jpg'),
  'morebean': require('../assets/images/morebean.jpg'),
  'peanut better': require('../assets/images/peanut better.jpg'),
  'mayonaise': require('../assets/images/mayonaise.jpg'),
  'mozoe juice': require('../assets/images/mozoe juice.jpg'),
  'tides': require('../assets/images/tides.jpg'),
  'ragaram': require('../assets/images/ragaram.jpg'),
  'wholesale grocery': require('../assets/images/wholesale grocery.jpg'),
  'Sl perfume': require('../assets/images/Sl perfume.jpg'),
  'babylotion': require('../assets/images/babylotion.jpg'),
  'charm perfum': require('../assets/images/charm perfum.jpg'),
  'nashwa perfume': require('../assets/images/nashwa perfume.jpg'),
  'ninea lotion': require('../assets/images/ninea lotion.jpg'),
  'odole perfume': require('../assets/images/odole perfume.jpg'),
  'ppink perfume': require('../assets/images/ppink perfume.jpg'),
  'sovazze perfume': require('../assets/images/sovazze perfume.jpg'),
  'uvage perfume': require('../assets/images/uvage perfume.jpg'),
  'vaseline': require('../assets/images/vaseline.jpg'),
  'aveena': require('../assets/images/aveena.jpg'),
  'bolts and nuts': require('../assets/images/bolts and nuts.jpg'),
  'cable tiles': require('../assets/images/cable tiles.avif'),
  'glue': require('../assets/images/glue.jpg'),
  'pipeco': require('../assets/images/pipeco.avif'),
  'pipeconnector': require('../assets/images/pipeconnector.jpg'),
  'pipes': require('../assets/images/pipes.jpg'),
  'stove parts': require('../assets/images/stove parts.jpg'),
  'wirecuttuter': require('../assets/images/wirecuttuter.jpg'),
  'HH drive': require('../assets/images/HH drive.jpg'),
  'RRam': require('../assets/images/RRam.jpg'),
  'trolley': require('../assets/images/trolley.jpg'),
  'economy wholesale': require('../assets/images/economy wholesale.jpg'),
  'icon': require('../assets/images/icon.png'),
  'adaptive-icon': require('../assets/images/adaptive-icon.png'),
  'splash': require('../assets/images/splash.png'),
  'favicon': require('../assets/images/favicon.png'),
};

export const getImageSource = (imageName) => {
  if (!imageName) {
    return require('../assets/images/icon.png');
  }
  return imageMap[imageName] || require('../assets/images/icon.png');
};

export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'shipped':
      return '#2196F3';
    case 'delivered':
      return '#4CAF50';
    case 'cancelled':
      return '#F44336';
    default:
      return '#666';
  }
};

export const getAllImageNames = () => Object.keys(imageMap);
