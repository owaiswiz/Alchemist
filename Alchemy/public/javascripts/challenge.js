$("document").ready(function(){
  $(".submit-challenge").click(function(){
    var random = Math.random() >= 0.5;
    $(".challenge-before").css({'display': 'none'});
    $(".submit-challenge").css({'display': 'none'});
    if ($('.challenge-before input[type="radio"]:checked').val()=="yes") {
      random = Capsule.challenge(1,true);
    }
    else{
      random = Capsule.challenge(1,false);

    }
    if (random)
      $(".challenge-after.success").css({'display': 'block'});
    else
      $(".challenge-after.failed").css({'display': 'block'});

    $(".challenge-system").data('toggle','');
    $(".challenge-system .card-text.text-warning").text('Already Challeneged')
  });
});
