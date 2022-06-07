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
    <div className="mx-auto w-full xl:w-7/12 xl:px-20 flex flex-col xl:items-stretch xl:flex-row justify-center">
      <div className="mt-5 flex justify-center mx-auto w-auto">
        <input
          onChange={(event) => setEmail(event?.target?.value ?? "")}
          className="w- rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="your@mail.com"
        />
        <button
          onClick={subscribe}
          className="px-4 xl:px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-2 xl:p-4 uppercase border-yellow-500 border-t border-b border-r"
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
  );
};

export default NewsletterForm;
