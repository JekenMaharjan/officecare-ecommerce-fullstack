"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format!")
        .required("Email is required!"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters!")
        .required("Password is required!"),
});

const SignIn = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/auth/signin", values);
                
                const { token, user } = res.data;   

                // Save token
                localStorage.setItem("token", token);
                localStorage.setItem("role", user.role);

                // Redirect based on role
                if (user.role === "admin") {
                    router.push("/admin/products");
                    toast.success("Admin SignIn Successfully !!");
                } else {
                    router.push("/customer/products");
                    toast.success("SignIn Successfully !!");
                }
            } catch (error: any) {
                toast.error("Failed to Login User !!");
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4">
            <Card className="w-full max-w-sm shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">
                        Sign In to your Account
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials to Sign In
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    {/* SignIn Form */}
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={formik.handleSubmit}
                    >
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
                            {formik.isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <p className="text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SignIn;
