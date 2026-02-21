"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
        initialValues: { fullName: '', email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/register", values);
                toast.success("Registration Successful !!");
                router.push("/signin");
            } catch (error: any) {
                toast.error("Failed to Register User !!");
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4">
            <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20">
                
                <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                        Create Your Account
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                        Enter your credentials to get started
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col px-6 sm:px-10 gap-5">
                    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>

                        {/* Fullname */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your Fullname"
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                                onBlur={formik.handleBlur}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                            />
                            {formik.touched.fullName && formik.errors.fullName && (
                                <p className="text-xs text-red-500 ml-1">{formik.errors.fullName}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="abc@example.com"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-500 ml-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your Password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-xs text-red-500 ml-1">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 mt-5 text-white py-3 rounded-xl shadow-lg transform transition hover:scale-105 duration-300"
                        >
                            {formik.isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 py-6">
                    <p className="text-sm text-center text-gray-600">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-600 font-medium hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;