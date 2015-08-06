JournalApp.Views.PostIndex = Backbone.View.extend({
  template: JST['posts/index'],
  className: "posts-index",

  initialize: function (){
    this.listenTo(this.collection, "remove reset add change:title", this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var that = this;
    this.collection.each(function (post) {
      var view = new JournalApp.Views.PostIndexItem({model: post});
      that.$(".posts").append(view.render().$el);
    });
    return this;
  }
})
