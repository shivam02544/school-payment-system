"use client";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObject = Object.fromEntries(formData.entries());
    if (
      formObject.username == "nppsnauroo" &&
      formObject.password == "abc@123"
    ) {
      router.push("/home");
    } else {
      toast.error("Invalid username or password");
    }
    e.target.reset();
  }
  return (
    <main>
      <Header />
      <div className="flex flex-col justify-center mx-auto items-center gap-6 size-80  mt-32 border-2 border-gray-400 rounded-lg shadow-sm">
        <h1 className="font-extrabold text-2xl text-orange-600 ">Login here</h1>
        <form
          className="flex flex-col gap-4 text-orange-600"
          onSubmit={(e) => handleLogin(e)}
        >
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
            name="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            required
          />
          <button className="btn font-bold text-lg">Login</button>
        </form>
      </div>
    </main>
  );
}
