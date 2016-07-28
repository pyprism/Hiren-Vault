import axios from 'axios';
import {encrypt, decrypt} from '../utils/pgp.js'


export async function bunny(data) {  //save password using async openpgp.js
	let encrypted = {};
	for(var key in data) {
		if (key === 'site_url' || key === 'tag')
			encrypted[key] = data[key];
		else
			encrypted[key] = await encrypt(sessionStorage.getItem('key'), data[key]);
	}
	axios({
		method: 'post',
        url: '/api/vault/',
        data: encrypted,
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    }).then(function(response) {
    	$.notify("Data Saved", "success");
    }).catch(function (err) {
        sweetAlert("Oops!", err.data, "error");
    });
}