JournalApp.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  titleTemplate: JST['posts/edit_title'],

  bodyTemplate: JST['posts/edit_body'],

  events: {
    "click button.delete-post": "deletePost",
    "click h3.post-title": "editTitle",
    "click p.post-body": "editBody",
    "blur input": "save",
    "blur textarea": "save"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render )
  },

  render: function() {
    this.$el.html(this.template({post: this.model}))
    return this;
  },

  deletePost: function () {
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("", { trigger: true });
  },

  editTitle: function (event) {
    if(this.editing){return;}
    this.editing = true
    var content = $(event.currentTarget).text();
    $(".post-title").empty();
    var formEl = this.titleTemplate({post: this.model});
    $(".post-title").html(formEl);
  },

  editBody: function(event) {
    if(this.editing){return;}
    this.editing = true
    var content = $(event.currentTarget).text();
    $(".post-body").empty();
    var formEl = this.bodyTemplate({post: this.model});
    $(".post-body").html(formEl);
  },

  save: function(event) {
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.post, {
      success: function(model) {
        this.editing = false;
        Backbone.history.navigate('posts/' + model.id, { trigger: true });
      }.bind(this),

      error: function(errors, errorText) {
        this.editing = false;
        this.errors = errorText.responseJSON;
        this.render();
      }.bind(this),
      wait: true
    });
  }
})
