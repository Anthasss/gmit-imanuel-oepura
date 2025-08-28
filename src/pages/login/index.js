import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-screen h-screen grid place-items-center bg-base-100">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <div className="form-control w-full">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </label>
        </div>

        <button className="btn btn-success text-white font-bold mt-4 w-full">Login</button>
      </fieldset>
    </div>
  );
}
