(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = exports.Card = function () {
  function Card() {
    _classCallCheck(this, Card);

    this.api = "https://api.myjson.com/bins/qtd53";
  }

  _createClass(Card, [{
    key: 'getCardData',
    value: function getCardData() {
      var card = this;
      var dataList = void 0;
      $.ajax({
        url: card.api,
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function success(response) {
          card.cardList(response.Pack);
        },
        error: function error(msg) {}
      });
    }
  }, {
    key: 'cardList',
    value: function cardList(cards) {
      $.each(cards, function (index, card) {
        $(".card-list").append('<option value="' + card.id + '">' + card.name + '</option>');
      });
    }
  }]);

  return Card;
}();

var Pack = function () {
  function Pack() {
    _classCallCheck(this, Pack);

    this.api = "https://api.myjson.com/bins/g5x4n";
    this.totalPack;
    this.currentState;
  }

  _createClass(Pack, [{
    key: 'getPackData',
    value: function getPackData(packId) {
      var pack = this;
      this.pack = packId;
      $.ajax({
        url: this.api,
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function success(response) {
          pack.packList(response);
        },
        error: function error(msg) {}
      });
    }
  }, {
    key: 'packList',
    value: function packList(_packList) {
      var pack = this;
      var packData = void 0;
      if (this.pack == "js") {
        packData = _packList.js;
      } else if (this.pack == "css") {
        packData = _packList.css;
      } else if (this.pack == "html") {
        packData = _packList.html;
      }
      this.totalPack = packData.length;
      $.each(packData, function (index, data) {
        $('.flash-pack-holder').append('<div class="packs pack-' + data.state + ' hide">\n                                <span class="question">' + data.question + '</span>\n                                <button class="btn btn-pack get-answer ">Show Answer</button>\n                                <span class="answer hide">' + data.answer + '</span>\n                                <button class="btn btn-pack get-question hide">Next Question</button>\n                                </span>\n                              </div>');
      });
      pack.firstQuestion();

      $(".get-answer").bind("click", function (e) {
        pack.showAnswer(e.target);
      });
      $(".get-question").bind("click", function (e) {
        pack.nextQuestion(e);
        pack.currentState++;
      });
    }
  }, {
    key: 'showAnswer',
    value: function showAnswer(data) {
      $(data).addClass('hide');
      if (this.currentState != this.totalPack) {
        $(data).nextAll().removeClass('hide');
      } else {
        $(data).next().removeClass('hide');
        $('.flash-pack-holder').append('<button class="btn btn-pack home">Go to Home</button>');
        $('.home').bind("click", function () {
          location.reload();
        });
      }
    }
  }, {
    key: 'nextQuestion',
    value: function nextQuestion(data) {
      var pack = this;
      var answerButton = void 0;
      $(data.target).parent().addClass('hide');
      $(data.target).parent().next().removeClass('hide');
      setTimeout(function () {
        answerButton = $(data.target).parent().next().find(".get-answer");
        pack.showAnswer(answerButton[0]);
      }, 10000);
      pack.screenTimer();
    }
  }, {
    key: 'firstQuestion',
    value: function firstQuestion() {
      var pack = this;
      var answerButton = void 0;
      $('.pack-1').removeClass("hide");
      pack.currentState = 1;
      setTimeout(function () {
        answerButton = $('.pack-1').parent().find(".get-answer");
        pack.showAnswer(answerButton[0]);
      }, 5000);
      pack.screenTimer();
    }
  }, {
    key: 'screenTimer',
    value: function screenTimer() {
      var totalTime = 5;
      setInterval(function () {
        $('.time').text('00:0' + (totalTime - 1));
      }, 1000);
    }
  }]);

  return Pack;
}();

exports.Pack = Pack;

},{}],2:[function(require,module,exports){
'use strict';

var _flashcard = require('./../js/flashcard.js');

$(document).ready(function () {
  var state = void 0;
  var cardObj = new _flashcard.Card();
  var packObj = new _flashcard.Pack();
  cardObj.getCardData();

  $('.card-selector').click(function (e) {
    e.preventDefault;
    var packId = $('.card-list').val();
    if (packId != "Select Game Card") {
      packObj.getPackData(packId);
      $('.flash-card-holder').addClass("hide");
      $('.flash-pack-holder').removeClass("hide");
      state = 1;
    }
  });
});

},{"./../js/flashcard.js":1}]},{},[2]);
