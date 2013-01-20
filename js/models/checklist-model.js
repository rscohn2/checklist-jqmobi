var app = app || {};
( function() {'use strict';
		app.Checklist = Backbone.Model.extend({
			defaults : {
				name : '',
				description: ''
			},
		});
	}()
);

