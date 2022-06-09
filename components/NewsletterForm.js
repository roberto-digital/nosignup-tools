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
    <section className="max-w-2xl mt-6 mx-auto px-4">
      <div className="mt-5">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="items-center justify-center sm:flex "
        >
          <input
            type="email"
            onChange={(event) => setEmail(event?.target?.value ?? "")}
            placeholder="Enter your email"
            className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-blue-400"
          />
          <button
            onClick={subscribe}
            className="w-full font-bold lg:max-w-fit mt-3 px-5 py-3 rounded-md text-gray-800 bg-yellow-400 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-gray-900 sm:mt-0 sm:ml-3 "
          >
            Get Nosignup Tools
          </button>
        </form>
        <p className="mt-3 mx-auto text-center max-w-lg text-[15px] text-gray-400">
          We never send spam and you can unsubscribe instantly with one click.
        </p>
        {state === "ERROR" && (
          <p className="mt-2 text-center text-red-500">{errorMessage}</p>
        )}
        {state === "SUCCESS" && (
          <p className="mt-2 text-center text-green-700">
            Success! You&apos;ve been added to our list.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterForm;
