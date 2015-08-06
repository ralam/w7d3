window.JournalApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var router = new JournalApp.Routers.PostsRouter({
      $el: $('div.content'),
      $sidebar: $('div.sidebar'),
      collection: new JournalApp.Collections.Posts()
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  JournalApp.initialize();
});
