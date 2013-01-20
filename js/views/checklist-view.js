var app = app || {};

// References DOM so delay execution
$(function() {'use strict';

	app.ChecklistSView = Backbone.View.extend({

		tagName : 'option',

		events : {
		},

		initialize : function() {
			this.model.on('change', this.change, this);
			this.model.on('destroy', this.remove, this);
		},

		change : function() {
			this.render();
		},

		render : function() {
			console.log('render checklist: ' + this.model.get('name'));
			this.$el.val(this.model.id);
			this.$el.text(this.model.escape('name'));
			return this;
		},
	});

	app.ChecklistLView = Backbone.View.extend({

		tagName : 'li',

		// The DOM events specific to an item.
		events : {
			'tap a' : 'edit'
		},

		initialize : function() {
			this.model.on('change', this.change, this);
			this.model.on('destroy', this.remove, this);
		},

		edit : function() {
			console.log('checklist edit: ' + this.model.name);
			app.editChecklist = this.model;
			app.checklistFormPage.view.populateForm(this.model.toJSON());
		},

		change : function() {
			console.log('change checklist: ' + this.model.get('name'));
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

		/*
		 * jqm puts some divs between the <li> and <a>, backbone keeps a handle for the <li>
		 * so keep a handle for the <a>, too. Consider using jquery to find the <a> from the <li>
		 */
		$a : null,

		render : function() {
			var checklist = this.model;
			console.log('render checklist' + checklist.get('name'));
			if (!this.$a) {
				// New view, insert the html into DOM and remember a handle to it so we can
				// update it when it is changed
				this.$a = $(this.make('a', {
					'href' : '#checklistFormPage',
					'data-transition' : 'slide'
				}));
				this.$el.append(this.$a);
			}
			// Update the <a>
			this.$a.html(checklist.get('name'));
			return this;
		},
	});

});
