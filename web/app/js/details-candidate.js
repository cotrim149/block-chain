$(document).ready(function() {
    btn_confirmation_vote = $("#confirmation_vote");
    end_vote = $("#end_vote");
   	container_details = $("#container_details");

    btn_confirmation_vote.click(function(){
    	end_vote.removeClass("hide");
    	container_details.addClass("hide");
    });
});