export class Card {
  constructor() {
    this.api ="https://api.myjson.com/bins/qtd53";

  }

  getCardData(){
    let card = this;
    let dataList;
    $.ajax({
      url: card.api,
      type: 'GET',
      data:{
        format:'json'
      },
      success: function(response){
        card.cardList(response.Pack);
      },
      error:function(msg){

      }
    });
  }
  cardList(cards){
    $.each(cards,function(index, card){
      $(".card-list").append(`<option value="${card.id}">${card.name}</option>`);
    })
  }

}

export class Pack {
  constructor() {
    this.api ="https://api.myjson.com/bins/g5x4n";
    this.totalPack;
    this.currentState;
  }

  getPackData(packId){
    let pack = this;
    this.pack=packId;
    $.ajax({
      url: this.api,
      type: 'GET',
      data:{
        format:'json'
      },
      success: function(response){
        pack.packList(response);
      },
      error:function(msg){

      }
    });
  }
  packList(packList){
    let pack = this;
    let packData;
    if(this.pack== "js"){
      packData = packList.js
    }else if (this.pack== "css") {
      packData = packList.css
    }else if (this.pack == "html") {
      packData = packList.html
    }
    this.totalPack = packData.length;
    $.each(packData, function(index,data){
      $('.flash-pack-holder').append(`<div class="packs pack-${data.state} hide">
                                <span class="question">${data.question}</span>
                                <button class="btn btn-pack get-answer ">Show Answer</button>
                                <span class="answer hide">${data.answer}</span>
                                <button class="btn btn-pack get-question hide">Next Question</button>
                                </span>
                              </div>`);
    })
    pack.firstQuestion();

    $(".get-answer").bind("click",function(e){
      pack.showAnswer(e.target);
    });
    $(".get-question").bind("click", function(e){
        pack.nextQuestion(e);
        pack.currentState++;
    });
  }

  showAnswer(data){
    $(data).addClass('hide');
    if(this.currentState != this.totalPack){
      $(data).nextAll().removeClass('hide');
    }else{
      $(data).next().removeClass('hide');
      $('.flash-pack-holder').append(`<button class="btn btn-pack home">Go to Home</button>`);
      $('.home').bind("click",function(){
        location.reload();
      })
    }
  }

  nextQuestion(data){
    let pack = this;
    let answerButton;
    $(data.target).parent().addClass('hide');
    $(data.target).parent().next().removeClass('hide');
    setTimeout(function(){
      answerButton = $(data.target).parent().next().find(".get-answer");
      pack.showAnswer(answerButton[0]);
    },10000);
    pack.screenTimer();
  }

  firstQuestion(){
    let pack =this;
    let answerButton;
    $('.pack-1').removeClass("hide");
    pack.currentState =1;
    setTimeout(function(){
      answerButton = $('.pack-1').parent().find(".get-answer");
      pack.showAnswer(answerButton[0]);
    },5000);
    pack.screenTimer();
  }

  screenTimer(){
    let totalTime = 5;
    setInterval(function(){
      $('.time').text(`00:0${totalTime-1}`)
    },1000);
  }
}
