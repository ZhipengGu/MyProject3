//an input UI component used repeatedly in the sign up form to render input and errors

import { useFormContext } from "react-hook-form";
import { findInputError } from "../utils/findInputError";
import { isFormInvalid } from "../utils/isFormInvalid";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { useEffect } from "react";

export const Input = ({
  name,
  label,
  type,
  id,
  validation,

  onValueChange = () => {},
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);

  useEffect(() => {
    onValueChange(value);
  }, [value, onValueChange]);

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div className="flex flex-col gap-2 max-sm:gap-0">
      <div className="flex justify-between text-xl max-sm:text-base ">
        <label htmlFor={id}>{label}</label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputErrors.error.message}
              key={inputErrors.error.message}
            />
          )}
        </AnimatePresence>
      </div>
      <input
        id={id}
        type={type}
        className="inputField"
        {...register(name, validation)}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="flex items-center gap-1 px-2 font-semibold text-red-500 bg-red-100 rounded-md"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
