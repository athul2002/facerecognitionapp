import React from 'react';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPass: '',
      name: '',
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onConfirmPasswordChange = (event) => {
    this.setState({confirmPass: event.target.value})
  }
  
  onSubmitSignIn = () => {
    fetch('http://localhost:6001/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        confirmPass: this.state.confirmPass,
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }else{
          alert('Account already exist! or Invalid register details')
        }
      })
  }

  render() {
    return (
      <div className='signup'>
         <article className=" signup_box mv4  w-50-m w-25-l  center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name"></label>
                <input
                  className="input pa2 input-reset w-100"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address"></label>
                <input
                  className="input pa2 input-reset w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  placeholder="Email ID"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password"></label>
                <input
                  className="input b pa2 input-reset  w-100"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div className="mv3">
                <label className="db bfw6 lh-copy f6" htmlFor="Confirmpassword"></label>
                <input
                  className="input b pa2 input-reset w-100"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Confirm Password"
                  onChange={this.onConfirmPasswordChange}
                />
              </div>
            </fieldset>
            <div className="register">
              <input
                onClick={this.onSubmitSignIn}
                className="register b ph3 pv2 input-reset bg-transparent ba grow pointer f4 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
      </div>
    );
  }
}

export default Register;