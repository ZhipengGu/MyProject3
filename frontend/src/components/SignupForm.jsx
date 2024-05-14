//a sign up form render on SignupPage

import React from "react";
import { useState, useEffect } from "react";
import AvatarSelector from "./AvatarSelector";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./input";
import { FormProvider, useForm } from "react-hook-form";
import avatar1 from "../assets/avatars/avatar1.png";
import axios from "axios";
import { tags } from "../utils/tags";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

import {
  username_validation,
  displayname_validation,
  email_validation,
  password_validation,
  c_password_validation,
} from "../utils/inputValidations";

export default function SignupForm() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [avatarPath, setAvatarPath] = useState(avatar1);

  const handleAvatar = (avatar) => {
    setAvatarPath(avatar);
  };

  const [password, setPassword] = useState("");
  const [cValidation, setCValidation] = useState(c_password_validation);

  useEffect(() => {
    setCValidation({
      ...c_password_validation,
      validation: {
        ...c_password_validation.validation,
        validate: (value) => {
          return value === password || "The passwords do not match";
        },
      },
    });
  }, [password]);
  const methods = useForm({ mode: "onChange" });

  const onSubmit = methods.handleSubmit((data) => {
    axios
      .post(`${API_BASE_URL}/api/auth/register`, { ...data, avatarPath })
      .then((res) => {
        setMessage(
          "User created successfully! Please wait while we redirect you to login page."
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  });

   const [selectedTags, setSelectedTags] = useState([]);
   const toggleTag = (tag) => {
     if (selectedTags.includes(tag)) {
       setSelectedTags(selectedTags.filter((t) => t !== tag));
     } else {
       setSelectedTags([...selectedTags, tag]);
     }
   };

  return (
    <div className="flex flex-col px-6 w-full text-2xl max-sm:text-base">
      {/* avatars */}
      <AvatarSelector selectedAvatar={avatarPath} handleAvatar={handleAvatar} />
      {/* form */}

      <FormProvider {...methods}>
        <form
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
          noValidate
          className="mt-6 max-sm:mt-4 "
        >
          <div className="grid gap-5 lg:grid-cols-2 max-sm:gap-2">
            <Input {...username_validation} />
            <Input {...displayname_validation} />
            <Input {...email_validation} />
            <Input
              {...password_validation}
              onValueChange={(newValue) => {
                setPassword(newValue);
              }}
            />
            <Input {...cValidation} />

            <label>
              Select Tags
              <br />
              <div className="w-full p-2 border border-sky-300 rounded-3xl mt-2 text-xl max-sm:text-base">
                {tags.map((tag, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 hover:bg-sky-200"
                  >
                    <input
                      {...methods.register("tags")}
                      type="checkbox"
                      value={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                    <span>{tag}</span>
                  </label>
                ))}
              </div>
            </label>
          </div>

          <input
            type="text"
            placeholder={message}
            className="placeholder:text-red-500 w-full mt-4"
          />
          <button onClick={onSubmit} className="submitBtn">
            Sign Up
          </button>
        </form>
        <div className="self-center mt-2.5 leading-6 text-sky-500 ">
          Already have an account?
          <Link to="/login" className="underline hover:text-emerald-300">
             Login
          </Link>
        </div>
      </FormProvider>
    </div>
  );
}
