var express = require('express');
var app = express();

var baseUrl = __dirname;
var url = {
	login: baseUrl + '/html/demo/index.html',
	orderlist:baseUrl + '/html/demo/orderlist.html',
	orderdetail:baseUrl + '/html/demo/orderdetail.html',
	productlist:baseUrl + '/html/demo/productlist.html',
	productdetail:baseUrl + '/html/demo/productdetail.html',
	workerlist:baseUrl + '/html/demo/workerlist.html',
	workerdetail:baseUrl + '/html/demo/workerdetail.html'
};
//login
app.get('/login', function (req, res) {
  res.sendFile(url.login);
});

//orderlist
app.get('/orderlist',function(req,res){
	res.sendFile(url.orderlist);
});

//orderdetail
app.get('/orderdetail',function(req,res){
	res.sendFile(url.orderdetail);
});

//productlist
app.get('/productlist',function(req,res){
	res.sendFile(url.productlist);
});

//productdetail
app.get('/productdetail',function(req,res){
	res.sendFile(url.productdetail);
});

//workerlist
app.get('/workerlist',function(req,res){
	res.sendFile(url.workerlist);
});

//workerdetail
app.get('/workerdetail',function(req,res){
	res.sendFile(url.workerdetail);
});

var data_orderlist = {
	data:[
		{
			'name':'aaa',
			'materialsId':12345,
			'status':1
		},{
			'name':'aaa',
			'materialsId':12345,
			'status':1
		}
	],
	msg:'ok',
	code:0
}
//json
app.get('/getOrderList',function(req,res){
	res.send(data_orderlist);
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

  app.use('/static',express.static('static'));
  app.use(express.static('html'));
});