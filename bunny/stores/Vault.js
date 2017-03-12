import { observable, action, computed, autorun } from 'mobx';
import axios from 'axios';
import Crypt from '../utils/Crypt.jsx';
import { toJS } from "mobx";


export class Vault {
    @observable loaded = false;
    @observable searching = false;
    @observable passwords = [];
    @observable password = {};
    @observable vaultId = 0;
    @observable loadingText = 'Loading from remote server....';


    @action getData() {
        if(this.loaded){
            // return
        } else {
            this.passwords = [];
            axios({
                method: 'get',
                url: '/api/vault/',
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            }).then(action('response action', (response) => {
                this.loadingText = 'Decrypting data...';
                (response.data).map(function (password) {
                    let salt = forge.util.hexToBytes(password['salt']);
                    let iteration = password['iteration'];
                    let key = forge.pkcs5.pbkdf2(sessionStorage.getItem('key'),
                        salt, iteration, 32);
                    let hiren = {};
                    hiren['id'] = password['id'];
                    hiren['site_url'] = Crypt.decrypt(password['site_url'], key, password['iv']);
                    hiren['username'] = Crypt.decrypt(password['username'], key, password['iv']);
                    hiren['email'] = Crypt.decrypt(password['email'], key, password['iv']);
                    hiren['password'] = Crypt.decrypt(password['password'], key, password['iv']);
                    hiren['note'] = Crypt.decrypt(password['note'], key, password['iv']);
                    hiren['icon'] = Crypt.decrypt(password['icon'], key, password['iv']);
                    hiren['tag'] = password['tag'];
                    hiren['audit'] = password['audit'];
                    hiren['iteration'] = password['iteration'];
                    hiren['created_at'] = moment.utc(password['created_at']).local().format("dddd, DD MMMM YYYY hh:mm:ss A");
                    hiren['updated_at'] = moment.utc(password['updated_at']).fromNow();
                    this.passwords.push(hiren);
                }.bind(this));
                this.loaded = true;
            })).catch(function(err) {
                console.error(err);
                sweetAlert("Oops!", err.statusText, "error");
            });
        }
    }

    findMe(key) {
        return key.id == this.vaultId;
    }

    @action findVaultById() {
        this.password =  toJS(this.passwords).find(this.findMe.bind(this));
    }

}