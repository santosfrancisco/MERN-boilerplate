import axios from 'axios';

const URL = 'http://localhost:6200/todo'

export default class TodoService {

	all(callback) {
		axios.get(URL + '')
			.then((response) => {
				callback(response.data);
			})
			.catch(function(error) {
				console.log(error);
				callback(null);
			});
	}

	get(id, callback) {
		axios.get(URL + '/' + id)
			.then((response) => {
				callback(response.data);
			})
			.catch(function(error) {
				console.log(error);
				callback(null);
			});
	}

	add(data, callback) {
		axios.post(URL + '/add/', {
				desc: data
			})
			.then(function(response) {
				console.log(response);
				callback();
			})
			.catch(function(error) {
				console.log(error);
				callback();
			});
	}

	update(data, id, callback) {
		axios.post(URL + '/update/' + id, {
				desc: data
			})
			.then(function(response) {
				console.log('Updated');
				callback();
			})
			.catch(function(response) {
				callback();
			});
	}

	delete(id, callback) {
		axios.get(URL + '/delete/' + id)
			.then(function(response) {
				callback();
			})
			.catch(function(response) {
				console.log('Error deleting');
				callback();
			});
	}
}