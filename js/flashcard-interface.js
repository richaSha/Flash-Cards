import {Card, Pack} from "./../js/flashcard.js";

$(document).ready(function(){
  let state;
  let cardObj = new Card();
  let packObj = new Pack();
  cardObj.getCardData();

  $('.card-selector').click(function(e){
    e.preventDefault;
    let packId = $('.card-list').val();
    if(packId != "Select Game Card"){
      packObj.getPackData(packId);
      $('.flash-card-holder').addClass("hide");
      $('.flash-pack-holder').removeClass("hide");
      state = 1;
    }
  })

})
