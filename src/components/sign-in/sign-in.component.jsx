import React, { Component } from "react";
import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGooglePopup } from "../../firebase/firebase.utils"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import './sign-in.styles.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;

        try {
            // Correct usage of signInWithEmailAndPassword with modular SDK
            await signInWithEmailAndPassword(auth, email, password);
            this.setState({ email: '', password: '' }); // Reset state on successful sign-in
        } catch (error) {
            console.log('Error signing in', error.message);
        }
    };

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleGoogleSignIn = async () => {
        try {
            await signInWithGooglePopup(); // Google sign-in logic
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    render() {
        const { email, password } = this.state;

        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />

                    <FormInput
                        name="password"
                        type="password"
                        value={password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <div className="buttons">
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type="button" onClick={this.handleGoogleSignIn} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
