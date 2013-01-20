var app = app || {};

// A tasklist is a collection of tasks
( function() {'use strict';

		var ChecklistCol = Backbone.Collection.extend({

			// Reference to this collection's model.
			model : app.Checklist,

			localStorage : new Store('todo-checklist')
		});

		app.checklistCol = new ChecklistCol();
	}());
