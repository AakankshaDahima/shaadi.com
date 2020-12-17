$(document).ready(function(){

  $('.priority').on('click', function(){
    var item = $(this).parent().clone().children().remove().end().text().trim().replace(/ /g, "-");
    $.ajax({
      type: 'PUT',
      url: '/todo/' + item,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

  $('form').on('submit', function(){
    var item = $('form input');
    var todo = {item: item.val()};
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: todo,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

  $('li').on('click', function(){
      var item = $(this).clone().children().remove().end().text().trim().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          location.reload();
        }
      });
  });

});
