"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../api/axiosInstance'
import useToast from "../../components/useToast"
import InputCtrl from "../../components/controllers/InputCtrl"


function UserDetails() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {showToast} = useToast()
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        // ...defaultValues
    });

    const fetchData = async () => {
        const res = await axiosInstance.get(`businessapp/BusinessOwnerView/?id=${112}`)
        console.log(res, "res")
        reset({
            name: res?.data?.data?.name,
            mobile_no: res?.data?.data?.mobile_no,
            whatsapp_no: res?.data?.data?.whatsapp_no,
            email_optional: res?.data?.data?.email_optional
        })
    }

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await axiosInstance.put("businessapp/BusinessOwner/edit/", { ...data })
            console.log(res, "data")
            if (res?.status === 200) {
                showToast("success" ,"UserDetails Successfully updated" )
            }

        } catch (error) {
            setLoading(false)
            console.log(error, "error")
        } finally {
            setLoading(false)

        }

    }
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

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <div className="container mt-4 p-0">
                <h3 className="mt-2 ps-1">User  Details</h3>
                <div className="row ms-1">
                    <div className="col-md-12 my-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row px-3">
                                <div className="col-12">
                                    <Row>
                                        <Col xl={6}>
                                            <InputCtrl
                                                control={control}
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="user name"
                                                showError={showError}
                                                required={true}
                                                disabled={false}
                                                className="mt-3 mb-3"
                                                label={"User Name"}
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <InputCtrl
                                                control={control}
                                                type="text"
                                                name="mobile_no"
                                                id="mobile_no"
                                                placeholder="Mobile Number"
                                                showError={showError}
                                                required={true}
                                                disabled={false}
                                                className="mt-3 mb-3"
                                                label={"Mobile Number"}
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <InputCtrl
                                                control={control}
                                                type="text"
                                                name="whatsapp_no"
                                                id="whatsapp_no"
                                                placeholder="Enter whatsapp Number"
                                                showError={showError}
                                                required={true}
                                                disabled={false}
                                                className="mb-3 mt-3"
                                                label={"Whatsapp Number"}

                                            />
                                        </Col>

                                        <Col xl={6}>
                                            <InputCtrl
                                                control={control}
                                                type="text"
                                                name="email_optional"
                                                id="email_optional"
                                                placeholder="Enter Email Address"
                                                showError={showError}
                                                required={true}
                                                disabled={false}
                                                className="mb-3 mt-3"
                                                label={"Email  Addresss"}

                                            />
                                        </Col>


                                    </Row>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserDetails