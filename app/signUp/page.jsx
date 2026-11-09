"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignUpPage() {
    const router = useRouter();
  const handleEmailSignUp = async(e) =>
  {
    e.preventDefault()
    const formData = new FormData(e.target)
    const user = Object . fromEntries(formData.entries())
  const { data, error } = await authClient.signUp.email({
    ...user,
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (data) {
    toast.success("Registration Successful!");
    router.push("/");
  }
  }
  return (
   <div className="flex flex-col gap-6 max-w-2xl mx-auto my-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome back
          </CardTitle>

          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button" className="w-full">
                  Login with Apple
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  Login with Google
                </Button>
              </Field>

              <FieldSeparator>
                Or continue with
              </FieldSeparator>

              <Field>
                <FieldLabel htmlFor="name">
                name
                </FieldLabel>

                <Input
                 
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">
                  Email
                </FieldLabel>

                <Input
                  id="email"
                 name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>


               <Field>
                <FieldLabel htmlFor="name">
                ImageURL
                </FieldLabel>

                <Input
                  id="image"
                  name="photoURL"

                  type="url"
                  placeholder="Image URL"
                  required
                />
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">
                    Password
                  </FieldLabel>

                  <a
                    href="#"
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>

            <FieldDescription className="text-center">
  Don't have an account?{" "}
  <Link
    href="/signUp"
    className="font-medium underline underline-offset-4"
  >
   Log In
  </Link>
</FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>.
      </FieldDescription>
    </div>
  );
}