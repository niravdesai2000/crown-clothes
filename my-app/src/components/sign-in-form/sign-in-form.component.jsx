import React, {useState} from "react";
import {googleSignInWithPopup, signAuthUserWithEmailAndPassword,} from "../../utils/firebase/firebase.utils";
import "./sign-in.styles.scss";
import {useNavigate} from "react-router-dom";
import Button from "../button";
import FormInput from "../form-input";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../redux/action/user/user.action";

const defaultFormFields = {
    email: "",
    password: "",
    error: {
        email: false,
        password: false,
    },
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const navigate = useNavigate();
    const dispatch = useDispatch();

// 4. function call and user data pass on createUserDocumentFromAuth function 
    const signWithGoogle = async (e) => {
        e.preventDefault();
        dispatch(googleSignInStart());
        navigate('/');
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    };

    // 8. pass parameter in createAuthUserWithEmailAndPassword and createUserDocumentFromAuth
    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = {};
        // validation input-fields
        for (const key in formFields) {
            const value = formFields[key];
            if (!value) {
                error[key] = true;
            }
        }
        setFormFields({
            ...formFields,
            error,
        });
        if (Object.values(error).some((theValue) => theValue)) {
            return;
        }
        try {
            await dispatch(emailSignInStart(email,password));
            setFormFields(defaultFormFields);
            navigate("/");

        } catch (error) {
            if (error.code === "auth/user-not-found") return alert("wrong email...");
            else if (error.code === "auth/wrong-password") return alert("wrong password...");
            console.log("error", error);
        }
    };
    const validationEmail = formFields.error.email && (
        <p>this is required field</p>
    );
    const validationPassword = formFields.error.password && (
        <p>this is required field</p>
    );
    const signUpFormField = [
        {
            label: "Email",
            type: "email",
            name: "email",
            onChange: handleChange,
            value: email,
            validation: validationEmail,
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            onChange: handleChange,
            value: password,
            validation: validationPassword,
        },
    ];
    return (
        <div className="sign-up-container">
            <h1>Sign In with Email and Password</h1>
            <form>
                {signUpFormField.map(
                    ({label, type, name, onChange, value, validation}, id) => {
                        return (
                            <FormInput
                                label={label}
                                type={type}
                                name={name}
                                onChange={onChange}
                                value={value}
                                validation={validation}
                                key={id}
                            />
                        );
                    }
                )}
                <div className="buttons-container">
                    <Button
                        type="submit"
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        buttonType="google"
                        onClick={(e) => {
                            signWithGoogle(e);
                        }}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
