var app = app || {};

// A tasklist is a collection of tasks
( function() {'use strict';

		var TaskCol = Backbone.Collection.extend({

			// Reference to this collection's model.
			model : app.Task,

			localStorage : new Store('todo-tasklist')
		});

		app.taskCol = new TaskCol();
	}());
