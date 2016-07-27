import axios from 'axios';
import {encrypt, decrypt} from '../utils/pgp.js'


export async function bunny(data) {
	let encrypted = [];
	for(var key in data) {
		encrypted[key] = await encrypt(sessionStorage.getItem('key'), data[key]);
	}

	axios({
		method: 'post',
        url: '/api/tag/',
        data: encrypted,
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    }).then(function(response) {
    	//$.notify("Tag Created", "success");
    	console.log(response);
    }).catch(function (err) {
    	console.error(err);
        sweetAlert("Oops!", err.data, "error");
    });
}