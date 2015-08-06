JournalApp.Views.PostForm = Backbone.View.extend({
  template: JST['posts/form'],

  initialize: function() {
    this.errors = [];
    this.listenTo(this.model, "sync", this.render)
  },

  events: {
    "submit .post-form": "submitPost"
  },

  render: function () {
    this.$el.html(this.template({post: this.model, errors: this.errors}));
    return this;
  },

  submitPost: function(event){
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.post, {
      success: function (model) {
        this.collection.add(model);
        Backbone.history.navigate("posts/" + model.id, {trigger: true});
      }.bind(this),

      error: function (errors, errorText) {
        this.errors = errorText.responseJSON;
        this.render();
      }.bind(this),

      wait: true
    });
  }
})
