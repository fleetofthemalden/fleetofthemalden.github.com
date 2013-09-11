var taco;
var mukmuk;
function init(){
	var poop = new Object();
	poop = {"1":{"type":"time","name":"SSA","Interval":["6:00","6:00","6:00","3:00"],"Rate":[16,18,20,"rest"],"Time":"21:00","Work":"18:00"},"2":{"type":"time","name":"SSB","Interval":["5:00","5:00","5:00","5:00","4:00"],"Rate":[16,18,20,22,"rest"],"Time":"24:00","Work":"20:00"},"3":{"type":"time","name":"SSC","Interval":["3:00","3:00","3:00","3:00","3:00"],"Rate":[16,18,20,22,"rest"],"Time":"15:00","Work":"12:00"},"4":{"type":"time","name":"SSD","Interval":["4:00","3:00","2:00","1:00","2:00","3:00","4:00","3:00"],"Rate":[16,18,20,22,20,18,16,"rest"],"Time":"22:00","Work":"19:00"},"5":{"type":"time","name":"SSE","Interval":["4:00","3:00","2:00","1:00","2:00"],"Rate":[18,19,20,21,"rest"],"Time":"12:00","Work":"10:00"},"6":{"type":"distance","name":"SSF5","Interval":[2000,2000,2000,"rest",2000,2000,"rest"],"Rate":[16,18,20,"4:00",18,16,"2:00"],"Distance":10000},"7":{"type":"distance","name":"SSF6","Interval":[2000,2000,2000,"rest",2000,2000,2000],"Rate":[16,18,20,"4:00",20,18,16],"Distance":12000},"8":{"type":"distance","name":"SSF7","Interval":[2000,2000,2000,2000,"rest",2000,2000,2000],"Rate":[16,18,20,22,"4:00",20,18,16],"Distance":14000},"9":{"type":"distance","name":"SSF8","Interval":[2000,2000,2000,2000,"rest",2000,2000,2000,2000],"Rate":[16,18,20,22,"4:00",22,20,18,16],"Distance":16000},"10":{"type":"distance","name":"SSG","Interval":[1000,1000,1000,1000,1000,"3:00"],"Rate":[17,19,21,19,17,"rest"],"Distance":5000},"11":{"type":"time","name":"SSH47","Interval":["5:00","4:00","3:00","2:00","1:00","2:00","3:00","4:00","3:00","2:00","1:00","2:00","3:00","2:00","1:00","2:00","3:00","4:00"],"Rate":[16,18,19,20,21,20,19,18,19,20,22,19,17,19,21,19,18,17],"Time":"47:00","Work":"47:00"},"12":{"type":"time","name":"SSH58","Interval":["5:00","4:00","3:00","2:00","1:00","2:00","3:00","4:00","3:00","2:00","1:00","2:00","3:00","2:00","1:00","2:00","1:00","2:00","3:00","2:00","1:00","2:00","3:00","4:00"],"Rate":[16,18,19,20,21,20,19,18,19,20,21,19,18,19,21,18,23,18,17,19,21,20,18,17],"Time":"58:00","Work":"58:00"},"13":{"type":"distance","name":"SSJ12","Interval":[1200,1200,1200,1200,1200,"4:00"],"Rate":[18,19,20,19,18,"rest"],"Distance":6000},"14":{"type":"distance","name":"SSJ15","Interval":[1500,1500,1500,1500,1500,"4:00"],"Rate":[18,19,20,19,18,"rest"],"Distance":7500},"15":{"type":"distance","name":"SSJ16","Interval":[1600,1600,1600,1600,1600,"4:00"],"Rate":[18,19,20,19,18,"rest"],"Distance":8000},"16":{"type":"time","name":"AT1","Interval":["4:00","3:00","2:00","1:00","4:00"],"Rate":[20,22,24,26,"rest"],"Time":"14:00","Work":"10:00"},"17":{"type":"distance","name":"AT2500","Interval":[500,500,500,500,500,"4:00"],"Rate":[22,24,26,24,22,"rest"],"Distance":2500},"18":{"type":"time","name":"AT33","Interval":["6:00","3:00","6:00","3:00","6:00","3:00"],"Rate":[22,"rest",25,"rest",22,"rest"],"Time":"27:00","Work":"18:00"},"19":{"type":"time","name":"AT34","Interval":["6:00","3:00","6:00","3:00","6:00","3:00","6:00","3:00"],"Rate":[22,"rest",25,"rest",25,"rest",22,"rest"],"Time":"36:00","Work":"24:00"},"20":{"type":"time","name":"AT35","Interval":["6:00","3:00","6:00","3:00","6:00","3:00","6:00","3:00","6:00","3:00"],"Rate":[22,"rest",25,"rest",27,"rest",24,"rest",21,"rest"],"Time":"45:00","Work":"30:00"},"21":{"type":"time","name":"AT45","Interval":["4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","4:00"],"Rate":[22,"rest",24,"rest",26,"rest",24,"rest",22,"rest"],"Time":"32:00","Work":"20:00"},"22":{"type":"time","name":"AT46","Interval":["4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","4:00"],"Rate":[22,"rest",24,"rest",26,"rest",26,"rest",24,"rest",22,"rest"],"Time":"38:00","Work":"24:00"},"23":{"type":"time","name":"AT47","Interval":["4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","4:00"],"Rate":[22,"rest",24,"rest",26,"rest",28,"rest",26,"rest",24,"rest",22,"rest"],"Time":"44:00","Work":"28:00"},"24":{"type":"time","name":"AT48","Interval":["4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","2:00","4:00","4:00"],"Rate":[22,"rest",24,"rest",26,"rest",28,"rest",27,"rest",25,"rest",23,"rest",21,"rest"],"Time":"50:00","Work":"32:00"},"25":{"type":"time","name":"AT640","Interval":["1:40","0:30","1:40","0:30","1:40","0:30","1:40","3:00"],"Rate":[22,"rest",24,"rest",26,"rest",28,"rest"],"Time":"11:10","Work":"6:40"},"26":{"type":"distance","name":"AT5K","Interval":[1000,1000,1000,1000,1000,"4:00"],"Rate":[23,23,23,23,23,"rest"],"Distance":5000},"27":{"type":"distance","name":"AT6K","Interval":[1000,1000,1000,1000,1000,1000,"4:00"],"Rate":[23,23,23,23,23,23,"rest"],"Distance":6000},"28":{"type":"distance","name":"AT7K","Interval":[1000,1000,1000,1000,1000,1000,1000,"4:00"],"Rate":[23,23,23,23,23,23,23,"rest"],"Distance":7000},"29":{"type":"distance","name":"AT8K","Interval":[1000,1000,1000,1000,1000,1000,1000,1000,"4:00"],"Rate":[23,23,23,23,23,23,23,23,"rest"],"Distance":8000},"30":{"type":"distance","name":"AT2000","Interval":[500,500,500,500,"4:00"],"Rate":[21,24,27,30,"rest"],"Distance":2000},"31":{"type":"time","name":"TRa60","Interval":["1:00","0:30","1:00","0:30","1:00","3:00"],"Rate":[28,"rest",30,"rest",32,"rest"],"Time":"7:00","Work":"3:00"},"32":{"type":"time","name":"TRa30","Interval":["0:30","0:30","0:30","0:30","0:30","0:30","0:30","0:30","0:30","2:00"],"Rate":[28,"rest",30,"rest",32,"rest",30,"rest",28,"rest"],"Time":"6:30","Work":"2:30"},"33":{"type":"time","name":"TRa40","Interval":["0:40","0:30","0:40","0:30","0:40","0:30","0:40","2:00"],"Rate":[24,"rest",27,"rest",30,"rest",33,"rest"],"Time":"6:10","Work":"2:40"},"34":{"type":"time","name":"SSK","Interval":["1:30","1:30","1:30","1:30","1:30","0:30"],"Rate":[18,20,22,19,17,"rest"],"Time":"8:00","Work":"7:30"},"45":{"type":"time","name":"SSCP","Interval":["3:00","3:00","3:00","3:00","2:00","3:00","3:00","3:00","3:00","2:00","3:00","3:00","3:00","3:00","2:00"],"Rate":[16,18,20,22,"rest",17,19,21,23,"rest",18,20,22,24,"rest"],"Time":"42:00","Work":"36:00"},"46":{"type":"time","name":"TRd30","Interval":["1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","5:00"],"Rate":[32,"rest",32,"rest",32,"rest",32,"rest",32,"rest",32,"rest",32,"rest"],"Time":"16:00","Work":"7:00"},"47":{"type":"distance","name":"TR2500","Interval":[500,"1:00",500,"1:00",500,"1:00",500,"1:00",500,"5:00"],"Rate":[22,24,26,24,22,"rest"],"Distance":2500},"48":{"type":"time","name":"SSL","Interval":["5:00","5:00","5:00","3:00"],"Rate":[16,18,20,"rest"],"Time":"18:00","Work":"15:00"},"49":{"type":"distance","name":"SSM","Interval":[750,750,750,750,"3:00"],"Rate":[17,20,22,19,"rest"],"Distance":3000},"50":{"type":"time","name":"AT420","Interval":["2:40","0:40","0:40","0:20","3:00"],"Rate":[23,25,27,30,"rest"],"Time":"7:20","Work":"4:20"},"51":{"type":"distance","name":"AT1221","Interval":[1221,"4:00",1221,"4:00",1221,"4:00"],"Rate":[23,"rest",23,"rest",23,"rest"],"Distance":3663},"52":{"type":"time","name":"AT20min","Interval":["4:00","4:00","4:00","4:00","4:00","4:00"],"Rate":[24,24,24,24,24,"rest"],"Time":"24:00","Work":"20:00"},"53":{"type":"time","name":"TRa50","Interval":["0:50","0:30","0:50","0:30","0:50","0:30","0:50","2:00"],"Rate":[27,"rest",29,"rest",31,"rest",33,"rest"],"Time":"7:50","Work":"3:20"},"54":{"type":"time","name":"TRb30","Interval":["0:30","0:20","0:30","0:20","0:30","0:20","0:30","0:20","0:30","2:00"],"Rate":[28,"rest",30,"rest",32,"rest",30,"rest",28,"rest"],"Time":"5:50","Work":"2:30"},"55":{"type":"time","name":"TRb40","Interval":["0:40","0:20","0:40","0:20","0:40","0:20","0:40","2:00"],"Rate":[24,"rest",27,"rest",30,"rest",33,"rest"],"Time":"5:40","Work":"2:40"},"56":{"type":"time","name":"TRb50","Interval":["0:50","0:20","0:50","0:20","0:50","0:20","0:50","2:00"],"Rate":[27,"rest",29,"rest",31,"rest",33,"rest"],"Time":"7:20","Work":"3:20"},"57":{"type":"time","name":"TRa60","Interval":["1:00","0:20","1:00","0:20","1:00","3:00"],"Rate":[28,"rest",30,"rest",32,"rest"],"Time":"6:40","Work":"3:00"},"58":{"type":"time","name":"TRd20","Interval":["1:00","0:20","1:00","0:20","1:00","0:20","1:00","0:20","1:00","0:20","1:00","0:20","1:00","5:00"],"Rate":[32,"rest",32,"rest",32,"rest",32,"rest",32,"rest",32,"rest",32,"rest"],"Time":"15:00","Work":"7:00"},"59":{"type":"distance","name":"SS2500","Interval":[500,500,500,500,500,"2:00"],"Rate":[18,20,22,19,17,"rest"],"Distance":2500},"60":{"type":"time","name":"AT1404","Interval":["1:40","1:00","1:40","1:00","1:40","1:00","0:40","0:40","0:20","3:00"],"Rate":[28,"rest",28,"rest",28,"rest",28,31,34,"rest"],"Time":"13:00","Work":"6:40"},"61":{"type":"time","name":"SSEt","Interval":["4:00","3:00","2:00","1:00","2:00"],"Rate":[16,18,20,22,"rest"],"Time":"12:00","Work":"10:00"},"62":{"type":"time","name":"SSKa","Interval":["2:00","2:00","2:00","2:00","2:00","3:00"],"Rate":[18,20,22,19,17,"rest"],"Time":"15:00","Work":"12:00"},"63":{"type":"time","name":"SS20","Interval":["4:00","4:00","4:00","4:00","4:00","4:00"],"Rate":[19,19,19,19,19,"rest"],"Time":"24:00","Work":"20:00"},"64":{"type":"time","name":"SSKc","Interval":["4:00","4:00","4:00","4:00","4:00","4:00"],"Rate":[18,20,22,19,17,"rest"],"Time":"23:00","Work":"20:00"},"65":{"type":"distance","name":"SSMa","Interval":[1000,1000,1000,1000,"3:00"],"Rate":[17,19,21,19,"rest"],"Distance":4000},"66":{"type":"time","name":"SSKb","Interval":["3:00","3:00","3:00","3:00","3:00","3:00"],"Rate":[18,20,22,19,17,"rest"],"Time":"18:00","Work":"15:00"},"70":{"type":"time","name":"SS30","Interval":["5:00","5:00","5:00","5:00","5:00","5:00","3:00"],"Rate":[19,19,19,19,19,19,"rest"],"Time":"33:00","Work":"30:00"},"71":{"type":"time","name":"AT5min","Interval":["5:00","4:00"],"Rate":[27,"rest"],"Time":"9:00","Work":"5:00"},"72":{"type":"distance","name":"TR2000","Interval":[500,"0:40",500,"0:40",500,"0:40",500,"5:00"],"Rate":[32,"rest",32,"rest",32,"rest",32,"rest"],"Distance":2000},"73":{"type":"distance","name":"TR1500","Interval":[500,"0:30",500,"0:30",500,"4:00"],"Rate":[32,"rest",32,"rest",32,"rest"],"Distance":1500},"74":{"type":"distance","name":"TR1000","Interval":[500,"0:20",500,"3:00"],"Rate":[32,"rest",32,"rest"],"Distance":1000},"75":{"type":"distance","name":"SSJ14","Interval":[1406,1406,1407,1407,1407,"4:00"],"Rate":[18,19,20,19,18,"rest"],"Distance":7033},"76":{"type":"time","name":"SSPow12","Interval":["0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30","0:40","0:30"],"Rate":[18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest"],"Time":"11:40","Work":"6:40"},"78":{"type":"time","name":"SSPow15","Interval":["0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30","0:50","0:30"],"Rate":[18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest"],"Time":"13:20","Work":"8:20"},"79":{"type":"time","name":"SSPow18","Interval":["1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30","1:00","0:30"],"Rate":[18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest",18,"rest"],"Time":"15:00","Work":"10:00"},"81":{"type":"distance","name":"SS1221","Interval":[1221,"3:00",1221,"3:00",1221,"3:00"],"Rate":[19,"rest",19,"rest",19,"rest"],"Distance":3663},"82":{"type":"time","name":"SSP21","Interval":["3:00","2:00","1:00","2:00","3:00","3:00"],"Rate":[17,19,21,19,17,"rest"],"Time":"14:00","Work":"11:00"},"83":{"type":"time","name":"ATP24","Interval":["2:00","1:20","0:40","1:20","2:00","3:00"],"Rate":[20,22,24,22,20,"rest"],"Time":"10:20","Work":"7:20"},"84":{"type":"time","name":"SSP22","Interval":["3:00","2:00","1:00","2:00","3:00","3:00"],"Rate":[18,20,22,20,18,"rest"],"Time":"14:00","Work":"11:00"},"85":{"type":"time","name":"SSP23","Interval":["3:00","2:00","1:00","2:00","3:00","3:00"],"Rate":[19,21,23,21,23,"rest"],"Time":"14:00","Work":"11:00"},"86":{"type":"time","name":"ATP25","Interval":["2:00","1:20","0:40","1:20","2:00","3:00"],"Rate":[21,23,25,23,21,"rest"],"Time":"10:20","Work":"7:20"},"87":{"type":"time","name":"ATP26","Interval":["2:00","1:20","0:40","1:20","2:00","3:00"],"Rate":[22,24,26,24,22,"rest"],"Time":"10:20","Work":"7:20"},"88":{"type":"time","name":"TRP28","Interval":["1:00","0:40","0:20","0:40","1:00","3:00"],"Rate":[24,26,28,26,24,"rest"],"Time":"6:40","Work":"3:40"},"89":{"type":"time","name":"TRP30","Interval":["1:00","0:40","0:20","0:40","1:00","3:00"],"Rate":[26,28,30,28,26,"rest"],"Time":"6:40","Work":"3:40"},"90":{"type":"time","name":"TRP32","Interval":["1:00","0:40","0:20","0:40","1:00","3:00"],"Rate":[28,30,32,30,28,"rest"],"Time":"6:40","Work":"3:40"}};
	mukmuk = JSON.stringify(poop);
	$.post("http://oldv1kenobi.herokuapp.com/", poop);
}
