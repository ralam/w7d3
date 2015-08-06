JournalApp.Views.PostIndexItem = Backbone.View.extend({
  template: JST['posts/indexItem'],
  tagName: 'li',

  events: {
    "click .delete-button": "removePost"
  },

  render: function() {
    this.$el.html(this.template({post: this.model}))
    return this;
  },

  removePost: function() {
    this.model.destroy();
    this.remove();
  }
})
