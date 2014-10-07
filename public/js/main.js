var video,
    videoUrl  = 'https://www.youtube.com/watch?v=ndMKTnSRsKM',
    tmpl_src  = $("#question_template").html(),
    tmpl      = _.template(tmpl_src);


$(document).ready(function () {
  // create a youtube video object
  var youtube = new Popcorn.HTMLYouTubeVideoElement('#video');
  youtube.src = videoUrl;

  // create popcorn player from youtube object
  video = new Popcorn(youtube);

  //create questions
  var questionsLength = questions.length;
  for (var i = 0; i < questionsLength; i++) {
    video.cue( questions[i].time, returnCallback(questions[i]) );
  }

  // start the video automatically
  video.play();
}, false);


// wraps view creation/render to preserve scope within popcorn cue
var returnCallback = function (opts) {
  var view = new quizView( opts );
  return function () { view.render(); };
};