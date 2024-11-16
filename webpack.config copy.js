const path = require('path'); //Обязательный параметр
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production', //Способ вывода собранных данных. production - без коментариев, development - с кментариями
  entry: {
    main: path.resolve(__dirname, 'src/scripts/index.js') //откуда будет браться основной входной фаил. Из него будет подтягиваться всё остальное.
  },
  output: { //Выходные параметры
    path: path.resolve(__dirname, 'dist'), //место куда будут сгружаться собранные данные для публикации
    filename: 'main.js', //как будет называться основной файл
    publicPath: '',
  },
  /* LIVE SERVER
    1. Установка сервера с помощью комманды npm install -D webpack-dev-server
    2. Для запуска сервера npx webpack serve
    3. Для выхода из этого режима нажать в терминале ctrl C
  */
  devServer: { 
    static: path.resolve(__dirname, 'dist'), //Где находится запускаемый файл index.html
    open: true,
    compress: true, //Сжимать данные для скорости
    port: 8081, //Порт на котором будет открываться liveserver, 8080 - по умолчанию, но в linux он занят
    hot: true, //автоматические перезагружаться при изменении данных в dist
    static: {
      directory: path.join(__dirname, 'dist') //Будем показывать из какой папки
    }
  },

  module: { //Подключение дополнительных файлов
    rules: [ 
      //Подкчлюение JS фалов
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },

      //Подключение изображений
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },

      /* Подкчлючение CSS файлов
      1. Установка:
         npm i postcss-loader --save-dev
         npm i autoprefixer --save-dev
         npm i cssnano --save-dev 
      */
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader' //В текущей сборке используется сборщик postcss-loader, у него есть отдельный файл настроек postcss.config.js
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),

  ]
}