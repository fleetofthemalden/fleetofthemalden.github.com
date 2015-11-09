//Figure out CORS 

// jQuery().ready(function(){
// 	jQuery('#messageHubPostButt').click(function(e){

// 		var messageText = jQuery('#messagehub').val();
// 		if(messageText.length > 0){
// 			var message = new Object();
// 			message.username = 'minnick.co';
// 			message.content = messageText;
// 			message.app_id = 1;
// 			// jQuery.post('http://pacific-badlands-5369.herokuapp.com/messages.json', message, function(){
// 			// 	console.log('success');
// 			// });
// 			var url = 'http://pacific-badlands-5369.herokuapp.com/messages.json';
// 			var success = function(data){console.log('success'); console.log(data);};
// 			// jQuery.ajax({
// 			//   type: "POST",
// 			//   url: 'http://pacific-badlands-5369.herokuapp.com/messages.json',
// 			//   data: message,
// 			//   // success: success,
// 			//   // crossDomain: true,
// 			//   // contentType: 'text/json',
// 			//   dataType: 'json'
// 			// });
// 			var request = new XMLHttpRequest();
// 			// var params = "action=something";
// 			var params = JSON.stringify(message);
// 			console.log(params);			
// 			request.open('POST', url, true);
// 			request.onreadystatechange = function() {if (request.readyState==4) alert("It worked!");};
// 			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			// request.setRequestHeader("Content-length", params.length);
// 			// request.setRequestHeader("Connection", "close");
// 			request.send(params);
// 		}
		
// 	});
// });