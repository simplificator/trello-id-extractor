class TrelloIdExtractor
  constructor: ($) ->
    @$ = $
    @showIdOnBoardCards()
    @showIdOnCurrentCard()

  destroy: =>
    clearInterval(window.trelloIdExtractorInterval)
    @container.remove()

  # - - -

  showIdOnBoardCards: =>
    @$(".list-card-details").each (i, card) =>
      @showIdOnBoardCard(card)

  parseBoardCardId: (card) =>
    @$(card).find("a.list-card-title").attr("href").match(/\/c\/([^\/]+)/)[1]

  showIdOnBoardCard: (card) =>
    cardId = @parseBoardCardId(card)
    return unless cardId?
    return if @$(card).find(".visible-card-id").length > 0
    $el = @$("<span>").attr(class: "visible-card-id").text("#" + cardId).append(" ")
    @$(card).find("a.list-card-title").prepend($el)

  # - - -

  parseCurrentCardId: (card) =>
    matches = window.location.href.match(/\/c\/([^\/]+)/)
    if matches then matches[1] else null

  showIdOnCurrentCard: =>
    cardId = @parseCurrentCardId()
    return unless cardId?
    return if @$(".card-detail-title").find(".visible-card-id").length > 0
    $el = @$("<span>").attr(class: "visible-card-id").text("#" + cardId).append(" ")
    @$(".card-detail-title h2").prepend($el)

appAPI.ready ($) ->
  callback = -> new TrelloIdExtractor($)
  window.trelloIdExtractorInterval = setInterval(callback, 250)
