const Settings = require('../models/settings');

const setSetting = async (key, value) => {
  await Settings.findOneAndUpdate({ key }, { key, value }, { upsert: true });
};

const getSetting = async (key) => {
  const setting = await Settings.findOne({ key });
  return setting && setting.value ? setting.value : 0;
};

module.exports = {
  setSetting,
  getSetting,
};
