"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const validationSchema = Yup.object({
    fullName: Yup.string()
        .min(2, "FullName must be at least 2 characters!")
        .required("FullName is required!"),
    email: Yup.string()
        .email("Invalid email format!")
        .required("Email is required!"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters!")
        .required("Password is required!"),
});

const Register = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password:'',
        },
        validationSchema,
        onSubmit: async(values) => {
            try {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + "/register", values);
                toast.success("Registration Successful !!");
                router.push("/signin");
            } catch (error: any) {
                alert(error.response?.data?.message || "Something went wrong");
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4">
            <Card className="w-full max-w-sm shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Create your Account
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col">
                    {/* Register Form */}
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={formik.handleSubmit}
                    >
                        {/* Fullname */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your Fullname"
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <p className="text-xs text-red-500 ml-2">{formik.errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="abc@example.com"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-500 ml-2">{formik.errors.email}</p>
                            )}
                        </div>
                        

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-xs text-red-500 ml-2">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Register Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                            {formik.isSubmitting ? "Registering..." : "Register"}
                        </Button>

                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/signin"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;
