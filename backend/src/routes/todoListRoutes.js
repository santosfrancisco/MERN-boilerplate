const express = require("express")
const app = express();
const router = express.Router();

//Schema
const TodoList = require('../models/TodoList')

// Get Specific
router.route('/:id').get((req, res) => {
	let id = req.params.id;
	TodoList.findById(id, (err, item) => {
		res.json(item);
	});
});

// Get All Items
router.route('/').get((req, res) => {
	TodoList.find((err, items) => {
		if (err) {
			console.log(err);
		} else {
			res.json(items);
		}
	});
});

// Add item
router.route('/add').post((req, res) => {
	let item = new TodoList(req.body);
	item.save()
		.then(item => {
			res.json('Added');
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

//  Update Specific
router.route('/update/:id').post((req, res) => {
	TodoList.findById(req.params.id, (err, item) => {
		if (!item)
			return next(new Error('Could not load Document'));
		else {
			item.desc = req.body.desc;

			item.save().then(item => {
					res.json('Updated');
				})
				.catch(err => {
					res.status(400).send("unable to update the database");
				});
		}
	});
});

// Delete Specific
router.route('/delete/:id').get((req, res) => {
	TodoList.findByIdAndRemove({
			_id: req.params.id
		},
		function(err, item) {
			if (err) res.json(err);
			else res.json('Deleted');
		});
});

module.exports = router;