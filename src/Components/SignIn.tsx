import {Button, TextField} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {useContext} from "react";
import {Name} from "../Context/loginContext.tsx";


interface User {
    username: string;
    email: string;
    password:string;
}

const signIn: SubmitHandler<User> = async user => {
    const nameContext = useContext(Name)
    if (!nameContext) return;
    const { setName } = nameContext;
    try {
        const newUserRes = await fetch(
            'http://new',
            {
                headers: {"content-Type": "application/json"},
                method: 'post',
                body: JSON.stringify(user)
            }
        )
        const newUser: User = await newUserRes.json();
        if (!newUser) throw new Error('registration failed');
        setName(user.username);
        console.log(newUser);
    }catch (error){
        console.log(error);
    }
    const navigate = useNavigate();
    const location = useLocation();
    navigate(location.state?.from || "/");
}
export default function SignIn() {
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