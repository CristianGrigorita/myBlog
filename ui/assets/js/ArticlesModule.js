var ArticlesModule = (function($){
	console.log("in ArticlesModule.js.");
	var BASE_URL = 'http://localhost/myBlog/api/';
	var endpoints = {
		getAll:    BASE_URL + 'articles',
	}

	var make_call = function(params, callback) {
		$.ajax({
			url: params.url,
			method: params.method,
			data: params.data || null,
			success: function (result){
				callback(null, result);
			},
			error: function (XHR, status, error) { 
				callback(error);
			},
			complete: function (XHR, status){

			},
		})	
	}


	return {
		getAll: function(callback){
			console.log("here");
			console.log(endpoints.getAll)
			var params = {
				url: endpoints.getAll,
				method: 'GET'
			}

			make_call(params, function(error, result) {
				if (error) {
					console.log("in ArticlesModule.js, on error.");
					return callback(error)
				}
				console.log("in ArticlesModule.js, on success.");
				callback (null, result);
			});
		},
	}
})($);