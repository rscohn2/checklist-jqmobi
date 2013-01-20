var app = app || {};

// References DOM so delay execution
$(function() {'use strict';

	app.TaskLView = Backbone.View.extend({

		tagName : 'li',

		// The DOM events specific to an item.
		events : {
			'tap a' : 'edit'
		},

		initialize : function() {
			this.model.on('change', this.change, this);
			this.model.on('destroy', this.remove, this);
			this.model.on('filterChecklist', this.filterChecklist, this);
		},

		filterChecklist : function(checklists) {
			var modelChecklist = this.model.get('checklist');
			var f = function(list) {
				return checklists.hasOwnProperty(list);
			}
			if (checklists == null || (modelChecklist && modelChecklist.some(f))) {
				this.$el.show();
			} else {
				this.$el.hide();
			}
		},

		edit : function() {
			app.editTask = this.model;
			app.taskFormPage.view.populateForm(this.model.toJSON());
		},

		change : function() {
			console.log('change task: ' + this.model.get('name'));
			this.render();

			var o = {
				success : function() {
				},
				error : function() {
					console.log('error syncing');
				}
			};

			Backbone.sync('update', this.model, o);
		},

		// Remember the <a> so we can update it when there is a change event
		$a : null,

		render : function() {
			var task = this.model;
			console.log('render task' + task.get('name'));
			if (!this.$a) {
				// New view, insert the html into DOM and remember a handle to it so we can
				// update it when it is changed
				this.$a = $(this.make('a', {
					'href' : '#taskFormPage',
					'data-transition' : 'slide'
				}));
				this.$el.append(this.$a);
			}
			// Update the <a>
			this.$a.html(task.get('name'));
			return this;
		},
	});
});
