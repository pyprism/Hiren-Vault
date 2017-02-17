import { observable, action, computed, autorun } from 'mobx';
import axios from 'axios';
import Crypt from '../utils/Crypt';
import { toJS } from "mobx";


export class Vault {
	@observable loaded = false;
    @observable searching = false;
    @observable loadingText = 'Loading from remote server....';
}