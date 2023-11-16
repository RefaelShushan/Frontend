import {Button, TextField} from "@mui/material";
import {useForm, SubmitHandler} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import { useNavigate,useLocation } from "react-router-dom";


interface User {
    name: string;
    email: string;
    password:string;
    confirmPassword: string
}
export default function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const signUp: SubmitHandler<User> = async (user: User) => {
        console.log(JSON.stringify(user))
        try {
            const newUserRes = await fetch(
                'http://localhost:3000/api/users/register',
                {
                    headers: {"content-Type": "application/json"},
                    method: 'post',
                    body: JSON.stringify(user)
                }
            )
            console.log(newUserRes)
            if (!newUserRes.ok) throw new Error('registration failed');
            console.log(newUserRes)
            navigate(location.state?.from || "/")
        }catch (error){
            console.log(error);
        }
    }
    const { register, watch, formState: { errors }, handleSubmit } = useForm<User>();
    const password = watch("password");
    return (
        <form onSubmit={handleSubmit(signUp)}>
            <div>
                <TextField
                    type="text"
                    id="name"
                    placeholder='Enter your Name'
                    {...register("name", {
                        required: `User name is required`,
                        minLength: {
                            value: 2,
                            message: `Minimum 2 chars`}
                    })}
                />
                {errors.name && <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => <p>{message}</p>}
                />}
            </div>
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
            </div>
                <div>
                    <TextField
                        type="text"
                        id="confirmPassword"
                        placeholder='Confirm Password'
                        {...register("confirmPassword", {
                            required: `Password is required`,
                            minLength:{
                                value: 8,
                                message: `Minimum 8 chars`
                            }, maxLength:{
                                value: 20,
                                message: `Max 20 chars`},
                            validate: (value) => value === password || "The passwords do not match",
                            pattern:{
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                                message: `Password must contain: upper case letter, lower case letter, digit and a special char`
                            }})}
                    />
                {errors.confirmPassword && <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({ message }) => <p>{message}</p>}
                />}
            </div>
            <Button type="submit">Sign Up</Button>
        </form>
    );
}

