import { useState } from "react"
import { useRegister } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const register = useRegister()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    register.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          alert("Register success! 🎉")
          navigate("/login")
        },
        onError: (err) => {
          console.error(
            "Register failed:",
            err.response?.data?.message || err.message
          )
          alert("Register failed. Please try again.")
        },
      }
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-md space-y-6">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register</legend>

            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              disabled={register.isPending}
              className="btn btn-neutral w-full mt-4"
              type="submit"
            >
              {register.isPending ? "Registering..." : "Register"}
            </button>

            {register.isError && (
              <p className="text-red-500">Register failed</p>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
