var search_bar = $("#search-bar");
var search_query = $('[name=search_query]')[0];
var links = $("#links");


$(document).ready(function(){
	search_bar.autocomplete({
		source: function(query,result){
			// console.log(query.term);
			$.ajax({
				url: "https://en.wikipedia.org/w/api.php",
				dataType: "jsonp",
				data:{
					'action':'opensearch',
					'format':'json',
					'search': query.term

				},
				success: function(data){
					console.log(data[1]);
					// result(data[1]);
					link_generator(data);
				}
			});
		}
	});
});

var link_generator = function(data){
	console.log(data);
	links.html("");
	var titles = data[1];
	var desc = data[2];
	var urls = data[3];
	for(var i=1;i<urls.length;i++){
		var heading = '<a href="'+urls[i]+'"target="_blank">'+titles[i]+'</a><br><p>'+desc[i]+'</p><hr>';
		links.append(heading);
	}
}