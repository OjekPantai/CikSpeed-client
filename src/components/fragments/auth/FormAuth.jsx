/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Link } from "react-router-dom";

const FormAuth = ({ isRegister }) => {
  return (
    <div>
      <Form method="POST" className="flex h-screen items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isRegister ? "Register" : "Login"}
            </CardTitle>
            <CardDescription>
              {isRegister
                ? "Enter your details to create your account"
                : "Enter your email below to login to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {isRegister && (
                  <>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </>
                )}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isRegister ? "Register" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isRegister
                ? "Already have an account? "
                : "Do not have an account? "}
              <Link
                to={isRegister ? "/login" : "/register"}
                className="underline"
              >
                {isRegister ? "Login now" : "Register now"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default FormAuth;
