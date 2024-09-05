import React from "react";
import { useRouter, useSearch, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../auth";

// LoginComponent function component
export default function LoginComponent() {
  const auth = useAuth(); // Access the authentication context
  const router = useRouter(); // Get the router instance
  const navigate = useNavigate(); // Get the navigate function for programmatic navigation

  const search = useSearch({ from: "/login" }); // Get the search parameters from the URL

  // Function to handle form submission
  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    // Define a sleep function to simulate delay
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    try {
      evt.preventDefault(); // Prevent default form submission
      const data = new FormData(evt.currentTarget); // Get form data
      const fieldValue = data.get("username"); // Extract the username field value

      if (!fieldValue) return; // If username is empty, exit early
      const username = fieldValue.toString(); // Convert username to string
      await auth.login(username); // Log in the user with the provided username

      await router.invalidate(); // Invalidate the router cache

      await sleep(1); // Simulate a short delay
      await navigate({ to: search.redirect || "/dashboard" }); // Navigate to the dashboard or redirect URL
    } catch (error) {
      console.error("Error logging in: ", error); // Log any errors that occur
    }
  };

  return (
    <div className="p-2 grid gap-2 place-items-center mt-10">
      <h3 className="text-3xl font-medium">Login page</h3>
      {search.redirect && (
        <p className="text-red-500">You need to login to access this page.</p> // Display a message if a redirect parameter is present
      )}
      <form className="mt-4 max-w-lg" onSubmit={onFormSubmit}>
        <div className="grid gap-2 items-center min-w-[300px]">
          <label htmlFor="username-input" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username-input"
            name="username"
            placeholder="Enter your name"
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            required // Make the username input field required
          />
        </div>
        <button
          type="submit"
          className="bg-[#02211e] text-white py-2 px-4 mt-5 rounded-md w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}