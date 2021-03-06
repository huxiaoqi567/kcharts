/*
TODO 坐标运算  画布大小计算
*/
;
KISSY.add('gallery/kcharts/1.4/basechart/index', function(S, Base, Node, Common) {
	var $ = S.all;

	var methods = {
		init: function(cfg) {
			cfg || (cfg = this.userConfig);
			var self = this,
				_cfg = self._cfg;
			if (cfg && cfg.renderTo) {
				if (!self.__isInited) {
					_cfg = self._cfg = S.mix({
						autoRender:true,
						zIndex: 0,
						yAxis: {
							spacing: {
								top: 0,
								bottom: 0
							}
						},
						xAxis: {
							spacing: {
								left: 0,
								right: 0
							}
						},
						canvasAttr: {
							x: 60,
							y: 60
						},
						zoomType: "x"
					}, cfg,undefined,undefined,true);
					
					self._$ctnNode = $(cfg.renderTo);

					self._$ctnNode.css({
						position:"relative",
						"-webkit-text-size-adjust": "none", //chrome最小字体限制
						"-webkit-tap-highlight-color": "rgba(0,0,0,0)" //去除touch时的闪烁背景
					});
					//构建内部容器
					self.createContainer();

					S.mix(self, {
						_datas: {
							cur: {},
							total: {}
						},
						_points: {},
						_centerPoints: [],
						_pointsX: [],
						_pointsY: [],
						_gridsX: [],
						_gridsY: [],
						_areas: [],
						_axisX: null,
						_axisY: null,
						_labelX: [],
						_labelY: [],
						_evtEls: [],
						_gridPoints: [], //存放网格线
						stackable: false
					});
					//过滤Array原型上的属性及方法
					for (var i in Array.prototype) {
						delete Array.prototype[i];
					}
				}

				//若为堆叠图 则最小值为0 暂时不兼容负值
				if (self.chartType == "barchart") {
					_cfg.xAxis.min = 0;
					_cfg.yAxis.min = 0;
				}
				
				self.__setData();

				self.__isInited = 1;
			}
		},
		__setData:function(){
			var self= this,
				series = self._cfg.series;
			if (!series || series.length <= 0 || !series[0].data) return;

				for (var i in series) {
					self._datas['total'][i] = {
						index: i,
						data: series[i].data
					};
					self._datas['cur'][i] = {
						index: i,
						data: series[i].data
					};
				}
		},
		//计算坐标刻度
		dataFormat: function() {
			var self = this,
				_cfg = self._cfg,
				zoomType = _cfg.zoomType,
				isY = zoomType == "x" ? false : true,
				ictn = self._innerContainer,
				left = _cfg.xAxis.spacing ? self.px2num(_cfg.xAxis.spacing.left) : 0,
				right = _cfg.xAxis.spacing ? self.px2num(_cfg.xAxis.spacing.right) : 0,
				top = _cfg.yAxis.spacing ? self.px2num(_cfg.yAxis.spacing.top) : 0,
				bottom = _cfg.yAxis.spacing ? self.px2num(_cfg.yAxis.spacing.bottom) : 0,
				width = ictn.width - left - right,
				height = ictn.height - top - bottom,
				x = ictn.x / 1 + left,
				y = ictn.y / 1 + top,
				allDatas,
				allDatasX,
				coordNum,
				coordNumX,
				coordPos,
				coordPosX,
				curCoordNum;
			self._pointsY = [];
			self._pointsX = [];
			switch (zoomType) {
				case "x":
					//获取所有刻度值
					allDatas = self.getAllDatas();
					//获取刻度 从定义刻度中获取
					curCoordNum = coordNum = self.coordNum = self._getScales(allDatas, _cfg.yAxis);
					//刻度值转换成图上的点
					coordPos = self.data2GrapicData(coordNum, false, true);
					break;
				case "y":
					allDatasX = self.getAllDatas();
					curCoordNum = coordNumX = self.coordNumX = self._getScales(allDatasX, _cfg.xAxis);
					coordPosX = self.data2GrapicData(coordNumX, true, false);
					break;
				case "xy":
					allDatas = self.getAllDatas(0);
					allDatasX = self.getAllDatas(1);
					curCoordNum = coordNum = self.coordNum = self._getScales(allDatas, _cfg.xAxis);
					coordNumX = self.coordNumX = self._getScales(allDatasX, _cfg.yAxis);
					coordPos = self.data2GrapicData(coordNum, false, false);
					coordPosX = self.data2GrapicData(coordNumX, true, true);
					break;
			}

			var getDataPoints = function(data, index, coordNum) {
				var series = _cfg.series[index],
					//坐标刻度的最大值
					max = Math.max.apply(null, coordNum),
					min = Math.min.apply(null, coordNum),
					points = [],
					j = 0,
					dataType = self.getDataType();
				switch (zoomType) {
					case "x":
						for (var i in self._pointsX) {
							if (data[i] === '' || data[i] === null) {
								points[i] = {
									x: self._pointsX[i].x, //横坐标
									index: Math.round(i) //索引
								};
							} else {
								points[i] = {
									x: self._pointsX[i].x, //横坐标
									y: self.data2Grapic(data[i], max, min, height, y, true), //纵坐标
									dataInfo: {
										y: data[i],
										x: _cfg.xAxis['text'][i]
									}, //数据信息 暂时将series.data的数据 和 series下的数据 耦合
									index: Math.round(i) //索引
								};
							}

						}
						break;
					case "y":
						for (var i in self._pointsY) {
							points[i] = {
								x: self.data2Grapic(data[i], max, min, width, x), //横坐标
								y: self._pointsY[i].y, //纵坐标
								dataInfo: {
									y: data[i],
									x: _cfg.yAxis['text'][i]
								}, //数据信息
								index: Math.round(i) //索引
							};
						}
						break;
					case "xy":
						var xs = self.data2GrapicData(self.getArrayByKey(series.data, 0)),
							ys = self.data2GrapicData(self.getArrayByKey(series.data, 1), true, true);
						for (var i in series.data) {
							points[i] = {
								x: xs[i], //横坐标
								y: ys[i], //纵坐标
								dataInfo: {
									y: data[i]
								}, //数据信息
								index: Math.round(i) //索引
							};
						}
						break;
				}
				return points;
			};

			switch (zoomType) {
				case "x":
					for (var i in coordPos) {
						self._pointsY[i] = {
							number: coordNum[i] + "",
							y: coordPos[i],
							x: x
						};
					}
					try {
						self._gridPoints = self.getSplitPoints(x, y + height, x + width, y + height, _cfg.xAxis.text.length, true);
						self._pointsX = self.getCenterPoints(self._gridPoints);
						for (var i in _cfg.xAxis.text) {
							self._pointsX[i]['number'] = _cfg.xAxis.text[i];
						}
					} catch (e) {
						throw new Error("未配置正确的xAxis.text数组");
					}
					break;
				case "y":
					for (var i in coordPosX) {
						self._pointsX[i] = {
							number: coordNumX[i] + "",
							y: y + height,
							x: coordPosX[i]
						};
					}
					try {
						self._pointsY = self.getSplitPoints(x, y, x, y + height, _cfg.yAxis.text.length + 1);
						for (var i in _cfg.yAxis.text) {
							self._pointsY[i]['number'] = _cfg.yAxis.text[i];
						}
					} catch (e) {
						throw new Error("未配置正确的yAxis.text数组");
					}
					break;
				case "xy":
					for (var i in coordPosX) {
						self._pointsY[i] = {
							number: coordNumX[i] + "",
							y: coordPosX[i],
							x: x
						};
					}
					for (var i in coordPos) {
						self._pointsX[i] = {
							number: coordNum[i] + "",
							y: y + height,
							x: coordPos[i]
						};
					}
					break;
			}
			for (var i in self._datas['cur']) {
				self._points[i] = getDataPoints(self._datas['cur'][i]['data'], i, curCoordNum);
			}
		},
		//减少当前的数据
		removeData: function(index) {
			var self = this;
			delete self._datas['cur'][index];
			self.dataFormat();
		},
		//恢复数据
		recoveryData: function(index) {
			var self = this;
			self._datas['cur'][index] = self._datas['total'][index];
			self.dataFormat();
		},
		//获取内部容器信息
		createContainer: function() {
			var self = this,
				_$ctnNode = self._$ctnNode,
				canvasAttr = self._cfg.canvasAttr,
				innerWidth = canvasAttr.width || (_$ctnNode.width() - 2 * canvasAttr.x),
				innerHeight = canvasAttr.height || (_$ctnNode.height() - 2 * canvasAttr.y),
				x = canvasAttr.x,
				y = canvasAttr.y,
				width = innerWidth,
				height = innerHeight,
				tl = {
					x: x,
					y: y
				},
				tr = {
					x: x + innerWidth,
					y: y
				},
				bl = {
					x: x,
					y: y + height
				},
				br = {
					x: x + innerWidth,
					y: y + height
				};
			//内部容器的信息
			self._innerContainer = {
				x: x,
				y: y,
				width: width,
				height: height,
				tl: tl,
				tr: tr,
				bl: bl,
				br: br
			};
		},
		//获取内部容器
		getInnerContainer: function() {
			return this._innerContainer;
		},
		getAllDatas: function() {
			var self = this,
				_cfg = self._cfg,
				allDatas = [],
				zoomType = _cfg.zoomType,
				numbers,
				arg = arguments[0],
				dataType = self.getDataType();
			if (_cfg.stackable) {
				//堆叠图 需要叠加多组数据 进行计算
				for (var i in self._datas['cur']) {
					if (S.isArray(self._datas['cur'][i]['data'])) {
						numbers = self._datas['cur'][i]['data'];
					}
					for (var j in numbers) {
						//fixed number bug
						allDatas[j] = allDatas[j] ? (numbers[j] - 0) + (allDatas[j] - 0) : numbers[j];
					}
				}
			} else {
				for (var i in self._datas['cur']) {
					if (S.isArray(self._datas['cur'][i]['data'])) {
						if (zoomType == "xy") {
							numbers = self.getArrayByKey(self._datas['cur'][i]['data'], arg)
						} else {
							numbers = self._datas['cur'][i]['data'];
						}
					}
					allDatas.push(numbers.join(","));
				}
			}
			return allDatas.length ? allDatas.join(",").split(",") : [];
		},
		getDataType: function() {
			var self = this;
			if (!self._datas['total'][0] || !self._datas['total'][0]['data']) return;
			for (var i in self._datas['total'][0]['data']) {
				if (S.isPlainObject(self._datas['total'][0]['data'][i])) {
					return "object";
				} else if (S.isNumber(self._datas['total'][0]['data'][i] - 0)) {
					return "number";
				}
			}
		},
		//获取刻度
		_getScales: function(allDatas, axis) {
			var self = this;
			//若直接配置了text 则按照text返回
			if (axis.text && S.isArray(axis.text)) {
				return axis.text;
			} else {
				var cmax = axis.max / 1,
					cmin = axis.min / 1,
					num = axis.num || 5,
					_max = Math.max.apply(null, allDatas),
					_min = Math.min.apply(null, allDatas);
				//全负数
				self.isNagitive = _max < 0 ? 1 : 0;
				//全为正数
				self.isPositive = _min > 0 ? 1 : 0;
				//全零
				self.isZero = _max === _min && _max === 0;
				//处理数据全0的情况
				if(self.isZero){
					_max = 5;
					_min = -5;
				}

				//纵轴上下各有10%的延展
				var offset = (_max - _min) * 0.1;
				//修复最大值最小值的问题  bug
				var max = (cmax || cmax == 0) ? (cmax >= _max ? cmax : _max + offset) : _max + offset;
				var min = (cmin || cmin == 0) ? (cmin <= _min ? cmin : _min - offset) : _min - offset;
				return self.getScales(max, min, num);
			}
		},
		/*
			TODO 将实际数值转化为图上的值
			@param data {Array|Number} 实际数值
			@param isY  {Boolean} 可选，是否是纵向的(默认值：false)
			@param nagitive 可选，是否是反向的(默认值：false)
		*/
		data2GrapicData: function(data, isY, nagitive) {
			if (undefined === data) return;
			var self = this,
				ictn = self._innerContainer,
				margin = isY ? ictn.x : ictn.y,
				height = ictn.height,
				width = ictn.width,
				zoomType = self._cfg.zoomType,
				dist,
				//坐标刻度的最大值
				max = isY ? Math.max.apply(null, self.coordNumX) : Math.max.apply(null, self.coordNum),
				min = isY ? Math.min.apply(null, self.coordNumX) : Math.min.apply(null, self.coordNum),
				tmp = [];

			switch (zoomType) {
				case "xy":
					dist = isY ? height : width;
					break;
				case "x":
					dist = height;
					break;
				case "y":
					dist = width;
					break;
			}
			//如果是数组
			if (S.isArray(data)) {
				for (var i in data) {
					tmp.push(self.data2Grapic(data[i], max, min, dist, margin, nagitive));
				}
				return tmp;
			} else {
				return self.data2Grapic(data, max, min, dist, margin, nagitive);
			}
		},
		/*
			TODO 数据翻转偏移 至画布
			@param data {Integer|Float}数据
			@param max {Integer|Float}坐标最大值
			@param min {Integer|Float}坐标最小值
			@param dist {Integer|Float}画布上的总长度
			@param offset {Integer|Float}偏移量
			@param nagitive {Boolean}是否反向
		*/
		data2Grapic: function(data, max, min, dist, offset, nagitive) {
			//反向
			if (max - min <= 0) return;
			if (nagitive) {
				return dist * (1 - (data - min) / (max - min)) + offset;
			} else {
				return dist * (data - min) / (max - min) + offset;
			}
		},
		/*
			TODO 获取一条线上的等分点坐标
			@param sx {Integer|Float}起点横坐标
			@param sy {Integer|Float}起点纵坐标
			@param ex {Integer|Float}终点横坐标
			@param ey {Integer|Float}终点纵坐标
			@param num {Integer}等分数
			@param e {Boolean}是否包含两端坐标
			@return {Array}
		*/
		getSplitPoints: function(sx, sy, ex, ey, num, e) {

			var ox = (ex - sx) / num,
				oy = (ey - sy) / num,
				array = [];

			e && array.push({
				x: sx,
				y: sy
			});

			for (var i = 0; i < num - 1; i++) {

				array.push({
					x: sx + (i + 1) * ox,
					y: sy + (i + 1) * oy
				});

			}

			e && array.push({
				x: ex,
				y: ey
			});
			return array;

		},
		/**
			TODO 获取中心点
			@return {Array}
		**/
		getCenterPoints: function(p) {
			var self = this,
				ary = [],
				len = p.length;
			if (len > 1) {
				for (var i = 0; i < len - 1; i++) {
					ary[i] = {
						x: (p[i]['x'] + p[i + 1]['x']) / 2,
						y: (p[i]['y'] + p[i + 1]['y']) / 2
					};
				}
			}
			return ary;
		},
		/**
			TODO 坐标刻度计算
			@return {Array}
		*/
		getScales: function(cormax, cormin, cornum) {

			var self = this,
				corstep,
				tmpstep,
				tmpnum,
				tmp, //幂
				step,
				extranum,
				min,
				max,
				middle,
				log = Math.log,
				pow = Math.pow,
				ary = [],
				fixlen = 0;


			// if (cormax < cormin) return;
			if(cormax === cormin && cormin > 0){
				cormin = 0;
				cormax = cormax * 2;
			}else if(cormax === cormin && cormin < 0){
				cormax = 0;
				cormin = cormin * 2;
			}

			//获取间隔宽度
			corstep = (cormax - cormin) / cornum;

			tmp = Math.floor(log(corstep) / log(10)) + 1;

			tmpstep = corstep / pow(10, tmp);

			if (tmpstep > 0 && tmpstep <= 0.1) {

				tmpstep = 0.1;

			} else if (tmpstep > 0.1 && tmpstep <= 0.2) {

				tmpstep = 0.2;

			} else if (tmpstep > 0.2 && tmpstep <= 0.25) {

				tmpstep = 0.25;

			} else if (tmpstep > 0.25 && tmpstep <= 0.5) {

				tmpstep = 0.5;

			} else {

				tmpstep = 1;

			}

			step = tmpstep * pow(10, tmp);

			middle = (cormax + cormin) / 2 - ((cormax + cormin) / 2) % step;

			min = max = middle;

			while (min > cormin) {

				min -= step;

			}
			while (max < cormax) {

				max += step;

			}
			if (self.isFloat(step)) {
				var stepstr = (step + "");
				if (stepstr.indexOf(".") > -1) {
					fixlen = stepstr.split(".")[1]['length'] > 4 ? 4 : stepstr.split(".")[1]['length'];
				}
			}
			for (var i = min; i <= max; i += step) {
				ary.push(parseFloat(i).toFixed(fixlen));
			}
			// 过滤数据 如果全部为正 则删除负值 若全部为负 则删除正数
			if (self.isNagitive) {
				for (i in ary) {
					ary[i] > 0 && ary.splice(i, 1)
				}
			} else if (self.isPositive) {
				for (i in ary) {
					ary[i] < 0 && ary.splice(i, 1)
				}
			}

			return ary;
		},
		/**
			冒泡排序 支持对象数组
			@param array 数组|对象数组
			@param sortDown 是否降序
			@param defineKey 排序的参考键值
		**/
		arraySort: function(array, sortDown, defineKey) {
			return array.sort(function(a, b) {
				if (!sortDown) {
					if (typeof a == "object" && typeof b == "object") {
						return a[defineKey] - b[defineKey];
					}
					return a - b;
				} else {
					if (typeof a == "object" && typeof b == "object") {
						return b[defineKey] - a[defineKey];
					}
					return b - a;
				}
			});
		},
		/*
			TODO 获取键值为key的数据 拼成数组
			@example getArrayByKey([{key:"1"},{key:"2"}],"key") => ["1","2"]
			@example getArrayByKey([[1,2],[3,4]],0)  [[1,2],[3,4]] => [1,3]
			@return array
		*/
		getArrayByKey: function(array, key) {
			var tmp = [];
			for (var i in array) {
				if (array[i][key] || S.isNumber(array[i][key])) {
					tmp.push(array[i][key]);
				}
			}
			return tmp;
		},
		/*
			TODO 判断是否是浮点数
			@return boolean
		*/
		isFloat: function(num) {
			return /^([+-]?)\d*\.\d+$/.test(num);
		},
		/*
			TODO 对象转数组
			@example
			{1:'aa',2:'bb'} => ['aa','bb']
			{"defineKey":"aa","defineKey":"bb"} = > ['aa','bb']
			@return array
		*/
		obj2Array: function(obj, defineKey) {
			var a = [];
			for (var i in obj) {
				a.push(defineKey ? obj[defineKey] : obj[i]);
			}
			return a;
		},
		/*
			TODO 获取对象的key
			@example
			{'name':'aa','age':'bb'} => ['name','age']
			@return array
		*/
		getObjKeys: function(obj) {
			var a = [];
			for (b in obj) {
				a.push(b);
			}
			return a;
		},
		isInSide: function(px, py, x, y, w, h) {
			if (px > x && px < x - (-w) && py > y && py < y - (-h)) {
				return true;
			}
			return false;
		},
		/*
				像素转换number
			*/
		px2num: function(arg) {
			var arg = arg || 0;
			var num = Math.round((arg + "").replace(/\s+|px/g, ''));
			return Math.round((arg + "").replace(/\s+|px/g, ''));
		},
		getOffset: function(e) {
			// see http://stackoverflow.com/questions/11334452/event-offsetx-in-firefox
			var target = e.currentTarget // 当前触发的目标对象
			if (e.offsetX) {
				return {
					offsetX: e.offsetX,
					offsetY: e.offsetY
				}
			} else {
				var offset = S.DOM.offset(target);
				return {
					offsetX: (e.offsetX || e.clientX - offset.left),
					offsetY: (e.offsetY || e.clientY - offset.top)
				}
			}
		},
		getConfig:function(){
			return this._cfg;
		},
		setConfig:function(cfg){
			this._cfg = S.mix(this._cfg,cfg,undefined,undefined,true);
			this.__setData();
		}
	};
	var BaseChart;
	if (Base.extend) {
		BaseChart = Base.extend(methods);
	} else {
		BaseChart = function() {};
		S.extend(BaseChart, Base, methods);
	}
	BaseChart.Common = Common;
	return BaseChart;
}, {
	requires: ['base', 'node', './common']
});