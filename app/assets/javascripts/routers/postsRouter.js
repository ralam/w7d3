JournalApp.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "welcome",
    "posts/new": "newPost",
    "posts/:id": "showPost",
    "posts/:id/edit": "editPost"
  },

  initialize: function (options) {
    this.$el = options.$el;
    this.$sidebar = options.$sidebar;
    this.collection = options.collection;
    this.generateSidebar();
  },

  welcome: function () {
    this.$el.empty();
    this.$el.html("<h1>Welcome to my journal!</h1>")
  },

  generateSidebar: function () {
    var view = new JournalApp.Views.PostIndex({ collection: this.collection });
    this.collection.fetch({ reset: true });
    this.$sidebar.html(view.render().$el);
  },

  showPost: function(id) {
    var post = this.collection.getOrFetch(id);
    var view = new JournalApp.Views.PostShow({ model: post })
    this.swapView(view);
  },

  swapView: function(view) {
    this.view && this.view.remove();
    this.view = view;
    this.$el.html(view.render().$el);
  },

  newPost: function() {
    var post  = new JournalApp.Models.Post();
    var view = new JournalApp.Views.PostForm({model: post, collection: this.collection});
    this.swapView(view);
  },

  editPost: function (id) {
    var post = this.collection.getOrFetch(id);
    var view = new JournalApp.Views.PostForm({model: post, collection: this.collection});
    this.swapView(view);
  }
})
