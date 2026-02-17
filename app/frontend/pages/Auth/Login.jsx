import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Auth from "../../components/Auth/Auth";
import Title from "../../components/ui/Title";
import EmailField from "../../components/Forms/Fields/EmailField";
import PasswordField from "../../components/Forms/Fields/PasswordField";
import Link from "../../components/ui/Link";
import Form from "../../components/Forms/Form";
import Button from "../../components/ui/Button";
import Layout from "../../components/Layouts/Layout";

import Error from "../../components/Error";
import { getPasswordErrors } from "../../components/Forms/Errors/getPasswordErrors";

import Checkbox from "../../components/Forms/Fields/Checkbox";
import { jsRoutes } from "../../lib/paths";
import Oauth from "../../components/Auth/Oauth";

function Login() {
  const { data, setData, post, transform, errors, processing } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const [inputErrors, setInputErrors] = useState({
    password: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    const passwordError = getPasswordErrors(data.password);
    if (passwordError != "") {
      setInputErrors({ ...inputErrors, password: passwordError });
      return;
    }
    post(
      "/login",
      transform((data) => ({
        user: { ...data },
      })),
    );
  };
  return (
    <Auth>
      {errors.general && <Error text={errors.general} />}

      <Title text="Log in to your account" />

      <Form onSubmit={onSubmit}>
        <EmailField
          onChange={(e) => setData("email", e.target.value)}
          value={data.email}
        />
        <PasswordField
          onChange={(e) => setData("password", e.target.value)}
          value={data.password}
          error={inputErrors.password}
          required
        >
          <Link
            name="Forgot ?"
            href={jsRoutes.forgotPasswordPath()}
            method="get"
          />
        </PasswordField>

        <Checkbox
          name="remember"
          onChange={(e) => setData("remember", e.target.checked)}
          text="Remember me"
        />

        <Button type="submit" color="blue" disabled={processing}>
          Log in
        </Button>
      </Form>
      <div className="mt-2">
        <p className="inline dark:text-gray-400 text-gray-700 mr-2">
          Don't have an account?
        </p>
        <span>
          <Link href={jsRoutes.signupPath()} method="get" name="Sign up" />
        </span>
      </div>

      <Oauth />
    </Auth>
  );
}
Login.layout = (page) => <Layout children={page} title="Login" />;

export default Login;
