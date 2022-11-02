import React from "react";
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:6001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }else{
          alert('Wrong Credentials')
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="signin">
 <article id='sign_in'className="  mv4  w-50-m w-25-l  center">
        <main id='sign_in' className="pa4 black-80">
          <div className="login-box white" >
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 black">Sign In</legend>
              <div className=" mt3">
                <label className="inputmail" htmlFor="email-address"></label>
                <input
                  className=" inputmail b pa2 input-reset  "
                  type="email"
                  name="email-address"
                  id="email-address"
                  placeholder="Email ID"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">

                <input
                  className="inputpass b pa2 input-reset  w-100"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="signin">
              <input
                onClick={this.onSubmitSignIn}
                className="Signin_button b ph3 pv2 input-reset bg-transparent ba grow pointer f4 dib"
                type="submit"
                value="Sign In"
              />
            </div>

            <div className="signup">
              <input
                onClick={() => onRouteChange('register')}
                className="Signup_button b ph3 pv2 input-reset bg-transparent ba grow pointer f4 dib"
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

export default Signin;
