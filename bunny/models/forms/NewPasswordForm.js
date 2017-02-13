 import validatorjs from 'validatorjs';
 import MobxReactForm from 'mobx-react-form';
 import axios from 'axios';
 import { browserHistory } from 'react-router';


const plugins = { dvr: validatorjs };


const fields = {
	site_url:{
		label: 'Site URL',
		placeholder: 'Site URL',
		rules: 'required|url|min:8'
	},
  username: {
    label: 'Username',
    placeholder: 'Insert Username',
    rules: 'string|between:2,25'
  },
  password: {
    label: 'Password',
    placeholder: 'Insert Password',
    rules: 'required|string|between:2,500'
  },
  email: {
  	label: 'Email',
  	placeholder: 'Enter Email',
  	rules: 'email'
  },
  note: {
  	label: 'Note',
  	placeholder: 'Optional Remarks',
  	rules: 'string'
  },
  iteration: {
  	label: 'Number of Iteration',
  	rules: 'integer|between:2000,9000'
  },
  tag: {
  	label: 'Tags',
  	rules: 'required|string'
  },
  audit: {
  	label: 'Check old password',
  	rules: 'required|boolean'
  },
  icon: {
  	label: 'Icon',
  	rules: 'required:string'
  }
};


class NewPasswordForm extends MobxReactForm {
	onSuccess(form) {
		console.log(form.values());
	}

	onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('Form is not valid!');
  }
}

export default new NewPasswordForm({ fields }, { plugins });