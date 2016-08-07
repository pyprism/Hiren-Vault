import axios from 'axios';
import {encrypt, decrypt} from '../utils/pgp.js'
import {observable, action, computed, runInAction} from "mobx";


export var appState = observable({
    bunny: []
});

appState.loadBunny = action(function(bugs){
    bugs.forEach(async data => {
        let temp = {};
        temp['id'] = data.id;
        temp['site_url'] = data.site_url;
        temp['tag'] = data.tag;
        temp['email'] = await decrypt(sessionStorage.getItem('key'), data.email);
        temp['username'] = await decrypt(sessionStorage.getItem('key'), data.username);
        temp['password'] = await decrypt(sessionStorage.getItem('key'), data.password);
        temp['note'] = await decrypt(sessionStorage.getItem('key'), data.note);
        temp['created_at'] = data.created_at;
        temp['updated_at'] = data.updated_at;
        runInAction("update state after decrypting data", () => {
            this.bunny.push(temp);
        });
        
    });
});

appState.fetch = async function() {
    let xoxo = await axios.get('/api/vault/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    });
    this.loadBunny(xoxo.data);
}
