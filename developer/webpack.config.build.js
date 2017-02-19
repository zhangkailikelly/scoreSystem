var webpack=require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");//分离css
var html=require("html-webpack-plugin");
module.exports={
	entry:{
		// users:"./users.jsx",
		manage:"./manage.jsx",
		vendors:["react","react-dom","react-bootstrap"]//分离第三方依赖，单独打包
	},
	output:{
		publicPath:"/dist",//设置为想要的资源访问路径,如果没有设置，则默认从站点根目录加载
		path:__dirname+"",//指定输出文件路径，通常设置为__dirname + ‘/build’,
		filename:"[name].js"
	},
	module:{
		loaders:[
			{	//loader文件加载顺序从右至左,从下至上;先将文件
				loader: "style!css",//css文件单独打包
				test:/\.css$/,//匹配希望处理文件的路径
				exclude: "/node_modules/"// 匹配不希望处理文件的路径
			},
			{	//file-loader:将匹配到的文件复制到输出文件夹，并根据output.publicPath的设置返回文件路径
				loader:"url-loader?limit=200000&&name=./imgs/[name].[ext]",
				test:/\.(gif|png|jpeg|jpg|bmp)$/,
				exclude: "/node_modules/"
			},
			{	//url-loader: 类似file-loader ,但是它可以返回一个DataUrl (base 64)如果文件小于设置的限制值limit
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: "url?limit=200000000000&&name=./fonts/[name].[ext]",
				exclude: "/node_modules/"
			},
			{
				loader:"babel?compact=false",
				test:/\.(js|jsx)$/,
				exclude: "/node_modules/"
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.css', '.jsx', '.css', '.jpg', '.png'],//自动补全后缀名
		alias: {}//设置路径别名
	},
	plugins:[
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		// new html({
		// 	title: "login",
		// 	//favicon:"",// 添加特定的 favicon 路径到输出的 HTML 文件中
		// 	template: __dirname + '/app.html',//插件没有配置loader时默认支持的ejs模板引擎
		// 	inject:"body",//所有的 javascript 资源将被放置到 body 元素的底部
		// 	filename: "login.html",//输出文件路径为output.path
		// 	//hash:true,//动态添加每次compile后的hash，防止引用缓存的外部文件问题
		// 	chunks: ["vendors","login"],//路径是相对于publicPath及生产环境下的路径
		// 	minify: {    //压缩HTML文件
		// 		removeComments: true,    //移除HTML中的注释
		// 		collapseWhitespace:true    //删除空白符与换行符
		// 	},
		// 	options:{
		// 		title:"login"
		// 	}
		// }),
		// new html({
		// 	title: "manage",
		// 	//favicon:"",// 添加特定的 favicon 路径到输出的 HTML 文件中
		// 	template: __dirname + '/app.html',//插件没有配置loader时默认支持的ejs模板引擎
		// 	inject:"body",//所有的 javascript 资源将被放置到 body 元素的底部
		// 	filename: "manage.html",//输出文件路径为output.path
		// 	//hash:true,//动态添加每次compile后的hash，防止引用缓存的外部文件问题
		// 	chunks: ["vendors","manage"],//路径是相对于publicPath及生产环境下的路径
		// 	minify: {    //压缩HTML文件
		// 		removeComments: true,    //移除HTML中的注释
		// 		collapseWhitespace:true    //删除空白符与换行符
		// 	},
		// 	options:{
		// 		title:"manage"
		// 	}
		// }),
		// new html({
		// 	title: "users",
		// 	//favicon:"",// 添加特定的 favicon 路径到输出的 HTML 文件中
		// 	template: __dirname + '/app.html',//插件没有配置loader时默认支持的ejs模板引擎
		// 	inject:"body",//所有的 javascript 资源将被放置到 body 元素的底部
		// 	filename: "users.html",//输出文件路径为output.path
		// 	//hash:true,//动态添加每次compile后的hash，防止引用缓存的外部文件问题
		// 	chunks: ["vendors","users"],//路径是相对于publicPath及生产环境下的路径
		// 	minify: {    //压缩HTML文件
		// 		removeComments: true,    //移除HTML中的注释
		// 		collapseWhitespace:true    //删除空白符与换行符
		// 	},
		// 	options:{
		// 		title:"users"
		// 	}
		// }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings:false//压缩时不显示警告信息
			}
		// 	except: ["$","require","export","jQuery"]    //排除关键字，不然会把这些都压缩替换
		}),
		new webpack.HotModuleReplacementPlugin(),//热加载模块，页面整体自动刷新
		// new ExtractTextPlugin("[name].css"/*,{ allChunks: true}*//*多个文件合成一个文件*/),//分离css，设置文件名
		new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery",moment:"moment"}),// 全局挂载插件
		new webpack.optimize.CommonsChunkPlugin("vendors", "vendors.js")]//将依赖分离打包
}
//安装依赖
//webpack ,style-loader,css-loader,


//安装依赖 webpack style-loader css-loader url-loader(npm3.x需单独下载file-loader)
//babel-loader(npm3.x需单独安装babel-core)   babel-preset-es2015  babel-preset-react
//react react-dom react-router
//
//热替换配置
//webpack-dev-server  babel-plugin-react-transform：代替react-hot-loader的插件 react-transform-hmr：安装这个才能实现热替换的功能。
// babel-preset-react-hmre：让Babel知道HMR（热替换） react-transform-catch-errors、redbox-react：
//open-browser-webpack-plugin自动打开浏览器插件
//