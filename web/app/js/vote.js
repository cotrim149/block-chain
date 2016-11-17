$(document).ready(function() {
	var user_logged 	 = JSON.parse(localStorage.getItem("login"));
	var order_candidates = JSON.parse(localStorage.getItem("order_candidates"));

	var type_candidate 	  		= $(".type_candidate");
	var number_candidate  		= $("#numberCandidate");
	var brn_vote 		  		= $("#brnVote");
	var container_vote 	  		= $("#container_vote");
	var container_details 		= $("#container_details");
	var number_show_candidate 	= $(".number_candidate");
	var name_candidate 	 		= $(".name_candidate");
	var state_candidate  		= $(".state_candidate");
	var office_candidate 		= $(".office_candidate");
	var broken_candidate 		= $(".broken_candidate");
	var img_candidate    		= $(".img_candidate");
	var confirmation_vote 		= $("#confirmation_vote");
	var end_vote 				= $("#end_vote");
	
	container_details.hide();
	type_candidate.html(order_candidates[0].label);   
	
	brn_vote.click(function(){
		find_candidate = _.find(seed_candidates, {'tipo':order_candidates[0].id,'numero':$("#numberCandidate").val(),'estado':user_logged.estado});
		
		if(find_candidate){
		 	container_vote.fadeOut();
		 	container_details.fadeIn();
		 	loadCandidate(find_candidate);
		 	nextCandidate();
		 	confirmVote(find_candidate);
		}else{
			alertify.error(order_candidates[0].label+' não encontrado.');
		}
	});

	function loadCandidate(obj){
		number_show_candidate.html(obj.numero);
		name_candidate.html(obj.name);
		state_candidate.html(obj.estado);
		office_candidate.html(order_candidates[0].label);
		broken_candidate.html(obj.partido);
		img_candidate.attr("src",obj.photo);
	}

	function confirmVote(candidate){
		confirmation_vote.click(function(){
			if(candidate.tipo != 5){
				window.location = "vote.html";
			}else{
				container_details.hide();
				end_vote.removeClass("hide");
				setTimeout(function(){window.location = "index.html";}, 2000);
			}
		});
	}

	function nextCandidate(){
		_.remove(order_candidates, function(n) {return n == order_candidates[0];});
		localStorage.setItem("order_candidates", JSON.stringify(order_candidates));
	}

});