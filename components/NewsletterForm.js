import { useState } from "react";
import axios from "axios";
import Button from "./Button";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email });
      setState("SUCCESS");
      setEmail("");
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setState("ERROR");
      setEmail("");
    }
  };

  return (
    <div className="p-6 mx-auto flex flex-col xl:items-stretch xl:flex-row  justify-center">
      <div className="w-full xl:w-7/12 xl:px-20 xl:py-28">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold leading-tight text-gray-700 mb-4 text-center md:mt-0 mt-4">
          Fresh No-Signup Tools Delivered To Your Inbox
        </h1>
        <p className="text-lg leading-normal text-gray-700  text-center">
          Get one email per month with the latest web apps that don&apos;t
          require signup or registration. No spam ever. Promise.
        </p>
        <div className="flex mt-12 mx-auto">
          <input
            onChange={(event) => setEmail(event?.target?.value ?? "")}
            className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 focus:text-gray-900 dark:text-white p-5 w-4/5 border border-transparent focus:outline-none focus:border-gray-500"
            type="email"
            value={email}
            placeholder="john.doe@gmail.com"
          />

          <Button onClick={subscribe} text="Get New Tools" size="xl" />
        </div>
        {state === "ERROR" && <p>{errorMessage}</p>}
        {state === "SUCCESS" && <p>Success!</p>}
      </div>
    </div>
  );
};

export default NewsletterForm;
