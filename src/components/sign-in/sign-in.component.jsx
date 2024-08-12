import React, { useState } from "react";

import FormInput from '../form-input/form-input.component';
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGooglePopup } from "../../firebase/firebase.utils"; // Corrected import

import './sign-in.styles.scss';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        // Handle email/password sign-in logic here
        setEmail('');
        setPassword('');
    }

    const handleChange = event => {
        const { value, name } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGooglePopup();
            // Handle successful Google sign-in
        } catch (error) {
            console.error('Error signing in with Google', error);
        }
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />

                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    handleChange={handleChange}
                    label="Password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton onClick={handleGoogleSignIn} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
