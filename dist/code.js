// Generated by CoffeeScript 1.6.3
var TrelloIdExtractor,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

TrelloIdExtractor = (function() {
  function TrelloIdExtractor($) {
    this.showIdOnCurrentCard = __bind(this.showIdOnCurrentCard, this);
    this.parseCurrentCardId = __bind(this.parseCurrentCardId, this);
    this.showIdOnBoardCard = __bind(this.showIdOnBoardCard, this);
    this.parseBoardCardId = __bind(this.parseBoardCardId, this);
    this.showIdOnBoardCards = __bind(this.showIdOnBoardCards, this);
    this.destroy = __bind(this.destroy, this);
    this.$ = $;
    this.showIdOnBoardCards();
    this.showIdOnCurrentCard();
  }

  TrelloIdExtractor.prototype.destroy = function() {
    clearInterval(window.trelloIdExtractorInterval);
    return this.container.remove();
  };

  TrelloIdExtractor.prototype.showIdOnBoardCards = function() {
    var _this = this;
    return this.$(".list-card-details").each(function(i, card) {
      return _this.showIdOnBoardCard(card);
    });
  };

  TrelloIdExtractor.prototype.parseBoardCardId = function(card) {
    return this.$(card).find("a.list-card-title").attr("href").match(/\/c\/([^\/]+)/)[1];
  };

  TrelloIdExtractor.prototype.showIdOnBoardCard = function(card) {
    var $el, cardId;
    cardId = this.parseBoardCardId(card);
    if (cardId == null) {
      return;
    }
    if (this.$(card).find(".visible-card-id").length > 0) {
      return;
    }
    $el = this.$("<span>").attr({
      "class": "visible-card-id"
    }).text("#" + cardId).append(" ");
    return this.$(card).find("a.list-card-title").prepend($el);
  };

  TrelloIdExtractor.prototype.parseCurrentCardId = function(card) {
    var matches;
    matches = window.location.href.match(/\/c\/([^\/]+)/);
    if (matches) {
      return matches[1];
    } else {
      return null;
    }
  };

  TrelloIdExtractor.prototype.showIdOnCurrentCard = function() {
    var $el, cardId;
    cardId = this.parseCurrentCardId();
    if (cardId == null) {
      return;
    }
    if (this.$(".card-detail-title").find(".visible-card-id").length > 0) {
      return;
    }
    $el = this.$("<span>").attr({
      "class": "visible-card-id"
    }).text("#" + cardId).append(" ");
    return this.$(".card-detail-title h2").prepend($el);
  };

  return TrelloIdExtractor;

})();

appAPI.ready(function($) {
  var callback;
  callback = function() {
    return new TrelloIdExtractor($);
  };
  return window.trelloIdExtractorInterval = setInterval(callback, 250);
});
