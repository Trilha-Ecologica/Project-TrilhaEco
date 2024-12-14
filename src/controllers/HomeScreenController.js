import { HomeScreenModel } from '../models/HomeScreenModel';

export const HomeScreenController = {
  handleImageLoadEnd: function () {
    HomeScreenModel.setImageLoaded(true);
  },

  getImageLoadStatus: function () {
    return HomeScreenModel.isImageLoaded;
  },
};
