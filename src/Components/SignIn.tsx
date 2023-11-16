import {Button, TextField} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {useContext} from "react";
import {Name, NameContextType} from "../Context/nameContext.tsx";

import {Email, EmailContextType} from "../Context/emailContext.tsx";


interface User {
    name: string;
    email: string;
    password:string;
}

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const nameContext = useContext<NameContextType | null>(Name)
    if (!nameContext) return;
    const { setName } = nameContext;
    const emailContext = useContext<EmailContextType | null>(Email)
    if (!emailContext) return;
    const { setEmail } = emailContext;
    const signIn: SubmitHandler<User> = async (user: User) => {
        try {
            const userRes = await fetch(
                'http://localhost:3000/api/users/login',
                {
                    headers: {"content-Type": "application/json"},
                    method: 'post',
                    body: JSON.stringify(user)
                }
            )
            const token = await userRes.text();
            if (!token) throw new Error('login failed');
            setName(user.name);
            setEmail(user.email);
            navigate(location.state?.from || "/")
        }catch (error){
            console.log(error);
        }
    }
    const { register, formState: { errors }, handleSubmit } = useForm<User>();
    return (
        <>
            <form onSubmit={handleSubmit(signIn)}>
                <div>
                    <TextField
                        type="text"
                        id="email"
                        placeholder='Enter Email'
                        {...register("email", {
                            required: "Email is required",
                            pattern: {value: /^\S+@\S+$/i,
                                message: `Stick on Email pattern`
                            }})}
                    />
                    {errors.email && <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }) => <p>{message}</p>}
                    />}
                </div>
                <div>
                    <TextField
                        type="text"
                        id="password"
                        placeholder='Enter Password'
                        {...register("password", {
                            required: `Password is required`,
                            minLength:{
                                value: 8,
                                message: `Minimum 8 chars`
                            }, maxLength:{
                                value: 20,
                                message: `Max 20 chars`},
                            pattern:{
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                message: `Password must contain: upper case letter, lower case letter, digit and a special char`
                            }})}
                    />
                    {errors.password && <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p>{message}</p>}
                    />}
                </div>
                <Button type="submit">Sign In</Button>
            </form>
            <Link to={'/signUp'}>sign up</Link>
        </>
    );
}