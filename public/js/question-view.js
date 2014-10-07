var quizView = function (opts) {
  this.initialize.apply(this, arguments);
};

_.extend(quizView.prototype, {
  questionData: {},
  el: $('#quiz_container'),

  initialize: function (opts) {
    this.questionData = opts;

    return this;
  },

  render: function () {
    window.video.pause();

    $(this.el)
      .html(tmpl(this.questionData))
      .addClass('active');

    this.bindEvents();
  },

  checkAnswer: function (el, correctEl) {
    el.parent().addClass('finished');

    if (el[0] === correctEl[0]) {
      el.addClass('correct');

      $('#right_wrong').addClass('right');
    } else {
      el.addClass('incorrect');
      correctEl.addClass('correct');

      $('#right_wrong').addClass('wrong');
    }
  },

  bindEvents: function () {
    var that = this;

    $(this.el).find('li').one('click', function (e) {
      var correctEl = $(that.el).find('li').eq(that.questionData.answer);

      that.checkAnswer($(e.target), correctEl);

      setTimeout(that.close, 3000);
    });
  },

  close: function () {
    $('#quiz_container').removeClass('active');

    window.video.play();
  }
});