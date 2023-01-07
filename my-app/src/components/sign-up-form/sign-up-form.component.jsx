import React, {useContext, useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth,} from "../../utils/firebase/firebase.utils";
import "./sign-up.styles.scss";
import {UserContext} from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import FormInput from "../form-input";
import Button from "../button";


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: {
        displayName: false,
        email: false,
        password: false,
        confirmPassword: false,
    },
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const {setUserState} = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value,
            };
        });
    };

    // console.log(formFields);

    // 8. pass parameter in createAuthUserWithEmailAndPassword and createUserDocumentFromAuth
    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = {};
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

        if (password !== confirmPassword) {
            alert("password and confirm password not matching...");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            setFormFields(defaultFormFields);
            setUserState(user);
            navigate("/");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert(error.code);
            } else {
                console.error(error);
            }
        }
    };
    const validationDisplayName = formFields.error.displayName && (
        <p>this is required field</p>
    );
    const validationEmail = formFields.error.email && (
        <p>this is required field</p>
    );
    const validationPassword = formFields.error.password && (
        <p>this is required field</p>
    );
    const validationConfirmPassword = formFields.error.confirmPassword && (
        <p>this is required field</p>
    );
    const signUpFormField = [
        {
            label: "displayName",
            type: "text",
            name: "displayName",
            onChange: handleChange,
            value: displayName,
            validation: validationDisplayName,
        },
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
        {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            onChange: handleChange,
            value: confirmPassword,
            validation: validationConfirmPassword,
        },
    ];
    return (
        <div className="sign-up-container">
            <h1>!Don't have account...</h1>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};
export default SignUpForm;
