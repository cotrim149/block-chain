$(document).ready(function () {
    var list_type_candidate = $("#list_type_candidate");  

    _.forEach(order_candidates, function(value, key) {
        list_type_candidate.append(insertHtmlTypeCandidate(value));
      console.log(value,key);
    });

    function insertHtmlTypeCandidate(value){
      html = '<div class="list-group col-md-2" data-type_candidate="'+value.id+'">'
        html += '<a href="#" class="list-group-item active">'
        html += value.label
        html += '</a>'
      html += '</div>'  
      return html;
    }

});