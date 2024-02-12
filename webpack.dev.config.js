import path from 'path';

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: false,
    contentBase: path.resolve(__dirname, '../build'),
  },
};
