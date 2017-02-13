 import validatorjs from 'validatorjs';
 import MobxReactForm from 'mobx-react-form';
 import axios from 'axios';
 import { browserHistory } from 'react-router';

 const plugins = { dvr: validatorjs };

 const fields = {
 	secret: {
    label: 'Secret',
    placeholder: 'Your Encryption Key',
    rules: 'required|string|between:2,30'
  }
 }

 class SecretForm extends MobxReactForm {
 	onSuccess(form) {
    let values = form.values();
    sessionStorage.setItem('key', values.secret);
    browserHistory.push('/dashboard/all/');
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form is not valid!');
  }

 }

 export default new SecretForm({ fields }, { plugins });