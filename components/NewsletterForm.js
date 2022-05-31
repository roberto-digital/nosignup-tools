import { useState } from "react";
import axios from "axios";
import { usePlausible } from "next-plausible";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState(null);

  const plausible = usePlausible();

  const subscribe = async () => {
    setState("LOADING");
    setErrorMessage(null);
    try {
      const response = await axios.post("/api/newsletter", { email });
      setState("SUCCESS");
      setEmail("");
      plausible("Newsletter Signup");
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
          Awesome No-Signup Tools Delivered To Your Inbox Once Per Month
        </h1>
        <p className="text-lg leading-normal text-gray-700  text-center">
          Get one email per month with the latest web apps that don&apos;t
          require signup or registration. No spam ever. Promise.
        </p>
        <div>
          <div className="mt-10 flex justify-center mx-auto">
            <input
              onChange={(event) => setEmail(event?.target?.value ?? "")}
              className="w-1/2 rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="your@mail.com"
            />
            <button
              onClick={subscribe}
              className="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
            >
              Keep me posted
            </button>
          </div>
          {state === "ERROR" && (
            <p className="mt-2 text-center text-red-500">{errorMessage}</p>
          )}
          {state === "SUCCESS" && (
            <p className="mt-2 text-center text-green-700">
              Success! You&apos;ve been added to our list.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
