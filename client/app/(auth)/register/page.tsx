import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

const Register = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4">
            <Card className="w-full max-w-sm shadow-2xl">
                <CardHeader className="text-center">
                    <CardTitle>
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Enter your credentials
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label>Email</Label>
                        <Input placeholder="abc@example.com" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter your password" />
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        Register
                    </Button>

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
