var app = app || {};

/*
 * View the checklist collection as select/option list
 */
$( function() {'use strict';

	app.ChecklistColLView = Backbone.View.extend({
		el : '#checklist',

		initialize : function() {
			app.checklistCol.on('change', this.render, this);
			app.checklistCol.on('add', this.add, this);
			app.checklistCol.on('reset', this.reset, this);
		},
		
		render : function() {
			app.logEvent('Render', this);
			this.options.page.refresh(this.$el, this.$el.listview);
		},

		reset : function() {
			app.logEvent('Reset', this);
			this.$el.html('');
			var addRender = function(checklist) {
				this.add(checklist).render();
			};
			app.checklistCol.each(addRender, this);
			this.render();
		},

		add : function(checklist) {
			app.logEvent('Add', this);
			var view = new app.ChecklistLView({
				model : checklist
			});
			this.$el.append(view.$el);
			return view;
		},
	});

	app.ChecklistColSView = Backbone.View.extend({

		events : {
		},

		initialize : function() {
			console.log('Created checklist select');
			app.checklistCol.on('change', this.render, this);
			app.checklistCol.on('add', this.add, this);
			app.checklistCol.on('reset', this.reset, this);
			app.checklistCol.on('destroy', this.destroy, this);
		},

		destroy : function() {
			app.logEvent('Destroy', this);
			this.render();
		},
		
		render : function() {
			app.logEvent('Render', this);
			/*
			 * Be careful, refresh just updates the count. This is fine for native select, since it uses select/option.
			 * If you are using non-native (jqm) select, then it will not be updated and you need to rebuild the whole
			 * thing. JQM prepends the select DOM stuff so you have to be careful to throw away everything if you
			 * want to start over.
			 */			
			this.options.page.refresh(this.$el, this.$el.selectmenu);
		},

		reset : function(checklist) {
			app.logEvent('Reset', this);
			this.$el.html('');
			var addRender = function(checklist) {
				this.add(checklist).render();
			};
			// Render invdividual checklist
			app.checklistCol.each(addRender, this);
			// Render the collection
			this.render();
		},

		add : function(checklist) {
			app.logEvent('Add', this);
			var view = new app.ChecklistSView({
				model : checklist
			});
			this.$el.append(view.$el);
			return view;
		},
	});
}())
