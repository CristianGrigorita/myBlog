$(document).ready(function(){

	var getAll = function (){
		ArticlesModule.getAll(function(err, result){
			if (err){
				return ArticlesUiModule.displayError(err);
			}
		console.log("in app1.js, on success");
		ArticlesUiModule.displayArticles(result);
		// clickSubscribe();
		})
	}
	getAll();
	
})