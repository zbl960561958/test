!function(){
	a(),bClick(),setInterval(function(){
		queryDetail();
	},500);
	function a(){
		var indexPage,allData,beginTime,cleanData;
		return new RegExp('list_bought_items.htm').test(window.location.href)?(
				b(),
				$('.btn-indexPage').length==0?(
						indexPage=$("<span class='btn-blue btn-indexPage'>导出当前页</span>"),
						$("[class^='batch-mod__container']").append(indexPage),void 0):void 0,
				$('.btn-allData').length==0?(
						allData=$("<span class='btn-blue btn-allData'>导出所有缓存</span>"),
						$("[class^='batch-mod__container']").append(allData),void 0):void 0,
				$('.input-beginTime').length==0?(
						beginTime = $("<input class='input-beginTime' style='width:110px;' type='date'/>"),
						$("[class^='batch-mod__container']").append(beginTime),void 0):void 0,
				$('.btn-cleanData').length==0?(
						cleanData=$("<span class='btn-blue btn-cleanData'>清除缓存</span>"),
						$("[class^='batch-mod__container']").append(cleanData),void 0):void 0,
				setTimeout(a,500)
			):(setTimeout(a,500),void 0);
	}
	function bClick(){
		$('.btn-indexPage').click(c),
		$('.btn-allData').click(e),
		$('.btn-cleanData').click(f)
	}
	/**
	 * 获取订单信息
	 */
	function b(){
		var order_list = $(":root").find('#J_bought_main .index-mod__order-container___1ur4-');
		var orders = new Array();
		for(var i = 0 ; i < order_list.length ; i++){
			var $order_id = $(order_list[i]).find('tbody').eq(0).find('span span').eq(2);
			var $order_msg = $(order_list[i]).find('tbody').eq(1).find('td');
			var order = {sync_server:0,sync_server_date:"",syc_date:"",date:"",id:"",title:"",color:"",size:"",pay:"",number:"",status:"",refund_status:"",detail_url:"",sync_status:"",Linkman:"",Phone:"",Address:"",ExpressId:"",ExpressName:"",ExpressDate:""};
			order.date = $(order_list[i]).find('tbody').eq(0).find('label span').eq(1).text();
			order.id = $order_id.text();
			order.title = $order_msg.eq(0).find('span').eq(2).text();
			order.color = $order_msg.eq(0).find('span span').eq(2).text();
			order.size = $order_msg.eq(0).find('span span').eq(5).text();
			order.pay = $order_msg.eq(4).find('strong span').eq(1).text();
			order.number = $order_msg.eq(2).find('p').text();
			order.status = $order_msg.eq(5).find('span').eq(0).text();
			order.refund_status = $order_msg.eq(3).find('i span').text();
			order.detail_url = $order_msg.eq(5).find("a:contains('订单详情')").attr("href");
			order.sync_status = 0;
			orders[i] = order;
		}
		
		d(orders);
		return orders;
	}
	/**
	 * 导出当前页
	 */
	function c(){
		var orders = b();
		var jsonOrders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		var exportOrders = new Array();
		for(var i = 0 ; i < orders.length ; i++){
			var ok = false;
			var order;
			for(var j = 0 ; j < jsonOrders.length ; j++){
				if(orders[i].id==jsonOrders[j].id){
					ok = true;
					order = jsonOrders[j];
					break;
				}
			}
			if(ok){
				exportOrders.push(order);
			}else{
				exportOrders.push(orders[i]);
			}
		}
		var cols = ['订单编号','付款日期','商品标题','颜色','尺码','数量','支付金额','订单状态','售后状态','详情URL','收货人','电话','地址','快递单号','快递','发货时间'];
		var colsFiled = {'订单编号':'id',
						'付款日期':'date',
						'商品标题':'title',
						'颜色':'color',
						'尺码':'size',
						'数量':'number',
						'支付金额':'pay',
						'订单状态':'status',
						'售后状态':'refund_status',
						'详情URL':'detail_url',
						'收货人':'Linkman',
						'电话':'Phone',
						'地址':'Address',
						'快递单号':'ExpressId',
						'快递':'ExpressName',
						'发货时间':'ExpressDate'};
		createFile(cols,colsFiled,exportOrders,'txt');
	}
	function d(orders){
		var jsonOrders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		for(var i = 0 ; i<orders.length ; i++){
			var ok = true;
			for(var j=0 ; j < jsonOrders.length ; j++){
				if(orders[i].id==jsonOrders[j].id){
					ok = false;
				}
			}
			if(ok){
				jsonOrders.splice(0,0,orders[i]);
			}
		}
		localStorage.zblOrders = JSON.stringify(jsonOrders);
	}
	/**
	 * 导出全部缓存
	 */
	function e(){
		var orders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		if(orders.length==0){
			alert('缓存数据为空');
			return;
		} 
		var cols = ['订单编号','付款日期','商品标题','颜色','尺码','数量','支付金额','订单状态','售后状态','详情URL','收货人','电话','地址','快递单号','快递','发货时间'];
		var colsFiled = {'订单编号':'id',
						'付款日期':'date',
						'商品标题':'title',
						'颜色':'color',
						'尺码':'size',
						'数量':'number',
						'支付金额':'pay',
						'订单状态':'status',
						'售后状态':'refund_status',
						'详情URL':'detail_url',
						'收货人':'Linkman',
						'电话':'Phone',
						'地址':'Address',
						'快递单号':'ExpressId',
						'快递':'ExpressName',
						'发货时间':'ExpressDate'};
		createFile(cols,colsFiled,orders,'txt');
	}
	/**
	 * 清除缓存
	 */
	function f(){
		var orders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		var beginTime = $('.input-beginTime').val();
		if(beginTime==''){
			if(confirm('确定清楚所有缓存订单？')){
				localStorage.removeItem("zblOrders");
			}
			return;
		}
		if(confirm('确定清楚'+beginTime+'之前的缓存订单？')){
			localStorage.removeItem("zblOrders");
			var newOrders = new Array();
			var index = 0;
			for(var i = 0 ; i < orders.length ; i++){
				if(new Date(orders[i].date.replace("-", "/").replace("-", "/"))>=new Date(beginTime.replace("-", "/").replace("-", "/"))){
					newOrders[index] = orders[i];
					index++;
				}
			}
			localStorage.zblOrders = JSON.stringify(newOrders);
		}
	}
	//获取当前时间，格式YYYY-MM-DD
    function getYYYYMMDD() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
	function queryDetail(){
		var orders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		if(orders.length==0){
			return;
		}
		for(var i = 0 ; i< orders.length ; i++){
			if(orders[i].sync_status==0 || ((orders[i].Linkman =='' || orders[i].ExpressId=='') && new Date(orders[i].syc_date.replace("-", "/").replace("-", "/"))<new Date(getYYYYMMDD().replace("-", "/").replace("-", "/")))){
				if(orders[i].detail_url.indexOf('trade.taobao.com')==-1 && orders[i].detail_url.indexOf('trade.tmall.com')==-1
						&& orders[i].detail_url.indexOf('buyertrade.taobao.com')==-1){
					continue;
				}
				var b = document.cookie,j={Linkman:"",Phone:"",Address:"",ExpressId:"",ExpressName:"",ExpressDate:""};
				$.ajax({
					headers:{"set-cookie":b},
					url:orders[i].detail_url,
					success:function(b){
						var c,f,g,k,n;
						-1==b.indexOf("<title>交易详情")?(console.log('获取异常'),setTimeout(g,2e3),void 0):(c=o(b,'"address":"','","',!0),""==c&&(c=o(b,'address\\":\\"','\\",'),c=toHanzi(c)),""==c&&(c=o(b,'<div class="addr_and_note">',"</dd>",!0),c=c.replace("收货地址","").replace("：","").trim()),""==c&&(c=o(b,"收货地址：</td>","</td>",!0)),c=(c+"").replace(/，/g,",").replace(/	/g,""),f=c.replace(/,,/g,",").split(","),f.length>=4?(j.Linkman=f[0].trim(),j.Phone=f[1].trim(),(f.length>=6 ? j.Address=f[2].trim()+f[3].trim()+f[4].trim()+f[5].trim():j.Address=f[2].trim()),(g=o(b,"<dt>物流公司：</dt>","</dd>",!0),""==g&&(g=o(b,"物流公司：</td>","</td>",!0)),""==g&&(g=o(b,'"logisticsName":"','","',!0)),""==g&&(g=o(b,'logisticsName\\":\\"','\\",',!0)),g=toHanzi(g),k=o(b,"<dt>运单号码：</dt>","</dd>",!0),""==k&&(k=o(b,"运单号：</td>","</td>",!0)),""==k&&(k=o(b,'"logisticsNum":"','"',!0)),""==k&&(k=o(b,'logisticsNum\\":\\"','\\"',!0)),k=toHanzi(k),n=o(b,'u53D1\\u8D27\\u65F6\\u95F4:\\",\\"value\\":\\"','\\"'),""==n&&(n=o(b,"发货时间：</td>","</td>",!0)),""==n&&(n=o(b,'发货时间:","value":"','"',!0)),j.ExpressId=k.replace("—","").trim(),j.ExpressName=g.replace("—","").trim(),j.ExpressDate=n),void 0):void 0)
						if(j.Linkman==''){
							orders[i].sync_status=2;
							localStorage.zblOrders = JSON.stringify(orders);
							return;
						}
						orders[i].Linkman = j.Linkman;
						orders[i].Phone = j.Phone;
						orders[i].Address = j.Address;
						orders[i].ExpressId = j.ExpressId;
						orders[i].ExpressName = j.ExpressName;
						orders[i].ExpressDate = j.ExpressDate;
						orders[i].sync_status=1;
						orders[i].syc_date = getYYYYMMDD();
						localStorage.zblOrders = JSON.stringify(orders);
						
					},
					error:function(){
						console.log('连接失败');
					}
				})
				return;
			}
		}
	}
	
	function syncTbOrder(){
		var orders =localStorage.zblOrders?JSON.parse(localStorage.zblOrders):[];
		if(orders.length==0){
			return;
		}
		for(var i = 0 ; i< orders.length ; i++){
			if(orders[i].sync_server==0 || (orders[i].sync_server==1 && new Date(orders[i].sync_server_date.replace("-", "/").replace("-", "/"))<new Date(getYYYYMMDD().replace("-", "/").replace("-", "/")))){
				var data = 
				$.ajax({
					url:'http://39.108.13.223/OrderSystem/sync/insertOneTbOrder',
					type : "post",
					dataType : "json",
					data : {
						"orderId" : orders[i].id,
						"date" : orders[i].date,
						"title" : orders[i].title,
						"color" : orders[i].color,
						"size" : orders[i].size,
						"pay" : orders[i].pay,
						"number" : orders[i].number,
						"status" : orders[i].status,
						"refundStatus" : orders[i].refund_status,
						"detailUrl" : orders[i].detail_url,
						"linkman" : orders[i].Linkman,
						"phone" : orders[i].Phone,
						"address" : orders[i].Address,
						"expressid" : orders[i].ExpressId,
						"expressname" : orders[i].ExpressName,
						"expressdate" : orders[i].ExpressDate
					},
					success:function(result){
						if(result.resultCode==000000){
							orders[i].sync_server = result.type;
							orders[i].sync_server_date = getYYYYMMDD();
						}else{
							orders[i].sync_server = 1;
							orders[i].sync_server_date = getYYYYMMDD();
						}
						
						localStorage.zblOrders = JSON.stringify(orders);
						
					},
					error:function(){
						console.log('连接失败');
					}
				})
				return;
			}
		}
	}
	function g(order){
		
		var b = document.cookie,j={Linkman:"",Phone:"",Address:"",ExpressId:"",ExpressName:"",ExpressDate:""};
//		var f,c="";
//		for(f=0;f<b.length;f++)
//			c+=b[f].name+"="+b[f].value+"; ";
		$.ajax({
			headers:{"set-cookie":b},
			url:order.detail_url,
			success:function(b){
				var c,f,g,k,n;
				-1==b.indexOf("<title>交易详情")?(console.log('获取异常'),setTimeout(g,2e3),void 0):(c=o(b,'"address":"','","',!0),""==c&&(c=o(b,'address\\":\\"','\\",'),c=toHanzi(c)),""==c&&(c=o(b,'<div class="addr_and_note">',"</dd>",!0),c=c.replace("收货地址","").replace("：","").trim()),""==c&&(c=o(b,"收货地址：</td>","</td>",!0)),c=(c+"").replace(/，/g,",").replace(/	/g,""),f=c.replace(/,,/g,",").split(","),f.length>=4?(j.Linkman=f[0].trim(),j.Phone=f[1].trim(),j.Address=f[2].trim(),(g=o(b,"<dt>物流公司：</dt>","</dd>",!0),""==g&&(g=o(b,"物流公司：</td>","</td>",!0)),""==g&&(g=o(b,'"logisticsName":"','","',!0)),""==g&&(g=o(b,'logisticsName\\":\\"','\\",',!0)),g=toHanzi(g),k=o(b,"<dt>运单号码：</dt>","</dd>",!0),""==k&&(k=o(b,"运单号：</td>","</td>",!0)),""==k&&(k=o(b,'"logisticsNum":"','"',!0)),""==k&&(k=o(b,'logisticsNum\\":\\"','\\"',!0)),k=toHanzi(k),n=o(b,'u53D1\\u8D27\\u65F6\\u95F4:\\",\\"value\\":\\"','\\"'),""==n&&(n=o(b,"发货时间：</td>","</td>",!0)),""==n&&(n=o(b,'发货时间:","value":"','"',!0)),j.ExpressId=k.replace("—","").trim(),j.ExpressName=g.replace("—","").trim(),j.ExpressDate=n),void 0):void 0)
				console.log('请求成功');
				console.log(c);
				console.log(f);
				console.log(g);
				console.log(k);
				console.log(n);
				console.log(j);
			},
			error:function(){
				console.log('连接失败');
			}
		})
	}
	function h(){
		var orders = b();
		g(orders[0]);
		for(var i = 0 ; i<orders.length ; i++){
			
		}
	}
	function o(a,b,c,d){
		var f,g,e=a.indexOf(b);
		return e>0?(f=a.indexOf(c,e+b.length),g=a.substring(e+b.length,f),d&&(g=g.replace(/<[^>]+>/g,"")),$.trim(g)):""
	}
	/**
	 * 获取淘宝cookies
	 */
	function k(a,b,c){
//		var e,f,d={};
//		if(chrome.cookies||(chrome.cookies=chrome.extension.cookies),d=a,d.hasSendBack=!1,e=0,null!=d.name&&d.name.length>0)
//			for(f=0;f<d.name.length;f++)
//				chrome.cookies.get({url:d.cUrl,name:d.name[f]},function(a){e++,null==a||null==a.value?1!=d.hasSendBack&&(d.hasSendBack=!0,l(d)):(console.log(a),d[a.name]=a.value,e>=d.name.length&&1!=d.hasSendBack&&l(d))});
//		else 
//			chrome.cookies.getAll({url:d.cUrl},function(a){l(a)})
	}
	
	/**
	 * 对通过 escape() 编码的字符串进行解码
	 */
	function toHanzi(b){
		try{
			var a=b.replace(/\\/g,"%");
			a=unescape(a);
			return a
		}catch(c){
			return b
		}
	}

    /**
     * 
     * @param cols  数组类型   格式['序号','姓名','地址']
     * @Param colsFiled     格式{'序号':'id','姓名':'name','地址':'address'}
     * @param data  数组类型   格式[{'id':1,'name':张三,'address':成都},{'id':2,'name':李四,'address':成都}]
     * @returns
     */
    function createFile(cols,colsFiled,data,type){

        var table = $('<table></table>');
        var th = $('<tr></tr>');

        var index = 0;

        for(var i = 0; i < data.length; i++){

            var tr = $('<tr></tr>');
            var values = data[i];

            for(var j = 0; j < cols.length; j++){

                var fliedName = cols[j];
                var flied = colsFiled[fliedName];
                var value = values[flied];
                var td = $('<td></td>');
                td.html(value);

                if(index == 0){
                    var tdTh = $('<td></td>');
                    tdTh.html(fliedName);
                    th.append(tdTh);
                }

                tr.append(td);
            }
            if(index == 0){
                table.append(th);
            }
            table.append(tr);
            index++;
        }
        table.attr('id','datatab');
        table.attr("style", "display: none");
        table.appendTo('body');
    	tableExport('datatab', '已买订单'+getNowFormatDate(), type);
        datatab.remove();
    }
    /**
     * 获取当前时间“yyyy-MM-dd HH:MM:SS”
     */
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }
}();