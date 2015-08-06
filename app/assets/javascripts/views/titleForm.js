JournalApp.Views.TitleForm = Backbone.View.extend({
  template: JST['posts/edit_title'],

  events: {
    'blur input': 'save'
  },

  initialize: function (options) {
    this.attribute = options.content;
  },

  render: function () {
    this.$el.html(this.template({post: this.model}));
    return this;
  },

  save: function(event) {
    var formData = $(event.currentTarget).serializeJSON();
    this.model.save(formData.title, {
      success: function(model) {
        Backbone.history.navigate('posts/' + model.id, { trigger: true })
      }.bind(this),

      error: function(errors, errorText) {
        this.errors = errorText.responseJSON;
        this.render();
      }.bind(this),
      wait: true
    });
  }

})
