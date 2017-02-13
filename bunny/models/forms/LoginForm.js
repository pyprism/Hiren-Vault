/**
 * Created by prism on 2/12/17.
 */
 import validatorjs from 'validatorjs';
 import MobxReactForm from 'mobx-react-form';
 import axios from 'axios';
 import { browserHistory } from 'react-router';

 const plugins = { dvr: validatorjs };

 const fields = {
  username: {
    label: 'Username',
    placeholder: 'Insert Username',
    rules: 'required|string|between:2,25'
  },
  password: {
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:2,25'
  }
};

class LoginForm extends MobxReactForm {

  onSuccess(form) {
    let values = form.values();
    axios({
      method: 'post',
      url: '/api-token-auth/',
      data: {
        'username': values.username,
        'password': values.password
      }
    }).then(function (response) {
      if (response.data['token']) {
        sessionStorage.setItem('token', response.data['token']);
        form.clear();
        browserHistory.push('/secret/');
      }
    })
    .catch(function (response) {
      console.log(response)
      sweetAlert("Oops!", 'Username/Password is not correct', "error");
    });
  };

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form is not valid!');
  }
}

export default new LoginForm({ fields }, { plugins });