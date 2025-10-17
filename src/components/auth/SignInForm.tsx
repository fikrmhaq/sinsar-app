import { useState } from "react";
import { useNavigate } from "react-router";
import {  EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')
  const navigate = useNavigate()



  const handleSubmit = async () => {

    try {
      const res = await axios.post(import.meta.env.VITE_API + "/auth/signin", { Username, Password });

      // Store token and user data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome, ${res.data.user.Nama}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      if (res.data.user.Role === 2) {
        navigate('/peminjaman')
      } else {
        navigate("/"); // redirect to dashboard/home
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong, please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your NIM and password to sign in!
            </p>
          </div>
          <div>

            {/* <form> */}
            <div className="space-y-6">
              <div>
                <Label>
                  NIM <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  placeholder="1233123"
                  onChange={ev => setUsername(ev.target.value)}
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={ev => setPassword(ev.target.value)}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
              </div>
              <div>
                <Button className="w-full" size="sm" onClick={handleSubmit}>
                  Sign in
                </Button>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
}
