/**
 * Created by prism on 2/12/17.
 */
import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

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
    console.log('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}

export default new LoginForm({ fields }, { plugins });