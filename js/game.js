const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let field_number = 0;

function showFieldNumber(divSelector) {
  field_number ++;
  $(divSelector).text(field_number);
}

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  showFieldNumber(divSelector)
  // TODO: помечать target текущим номером
  
  // FIXME: тут надо определять при первом клике firstHitTime
  
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала DONE!!!
  $('.game-field').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(this).removeClass("target").html(' ');
    hits = hits + 1;
    round();
  }
  else {
    $(this).not('.target').addClass('miss');
  }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  $('.container').hide();
  $('.start-button').on('click', function() {
    $(this).hide(1000);
    $('.container').show(2000);
    firstHitTime = getTimestamp();
  })
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
