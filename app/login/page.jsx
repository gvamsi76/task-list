"use client"
import React, { useState } from 'react'
import InputCtrl from '../components/controllers/InputCtrl';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { SetLocalStorage } from '../common/utility';
import useToast from '../components/useToast';
import { useRouter } from 'next/navigation';

const defaultValues = {
    username: "",
    password: "",

}

function Login() {
    const { showToast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        ...defaultValues
    });

    const showError = (_fieldName) => {
        const keyList = _fieldName.split(".");
        const [key1, key2] = keyList;
        let error;
        if (key1 && key2) {
            const errorObj = (errors)[key1];
            error = errorObj ? errorObj[key2] : null;
        } else if (key1) {
            error = (errors)[key1];
        }
        return error ? error.message || "Field is required" : null;
    };
    const onSubmit = async (data) => {
        setLoading(true)

        const payload = {
            username: data.username,
            password: data.password,

        }
        try {
            const response = await axios.post(`https://api.aroundme.co.in/login/businesslogin/`, { ...payload })

            if (response?.status === 200) {
                setLoading(false)

                showToast("success", response?.data?.message)
                SetLocalStorage("user",response?.data);
                SetLocalStorage("token", JSON.stringify(response?.data.access));
                router.push("/")
            }

        } catch (error) {
            setLoading(false)
            console.log(error, "error")
        } finally {
            setLoading(false)

        }

    }
    return (
        <div className={`container-fluid p-0 main-wrapper`}>
            <div className="login-page h-100 ">
                <div className="background_image d-flex align-items-center justify-content-center m-0 h-100">
                    <div className="form col-md-5 col-sm-8 col-12 ">

                        <div className="header text-center">
                            <h2> Login</h2>
                            <h6>Welcome back</h6>
                        </div>
                        <form
                            className="w-100 text-start"
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="mb-3">
                                <div className="input-container">
                                    <InputCtrl
                                        control={control}
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="User Name"
                                        label="User Name"
                                        showError={showError}
                                        required={true}
                                        disabled={loading}
                                        className=""
                                    />
                                    <i
                                        className="input-icon fa fa-envelope fa-lg fa-fw"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </div>
                            <div className="input-container">
                                <InputCtrl
                                    control={control}
                                    type={"password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    label="Password"
                                    showError={showError}
                                    required={true}
                                    disabled={loading}
                                    className="mb-3"
                                />


                            </div>
                            <div className="mb-2">
                                <button className="signInBtn" type="submit" disabled={loading}>
                                    Sign in
                                </button>
                            </div>
                            <div className="mb-2">
                                <a href="" className="d-flex justify-content-center" type="submit">Don't have an account? Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login