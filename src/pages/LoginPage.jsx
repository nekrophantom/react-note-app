import { useLogin } from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"
import { useAuthLoginStore } from "../store/useAuthLoginStore"

const LoginPage = () => {
    const { email, setEmail, password, setPassword } = useAuthLoginStore();

    const login = useLogin()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            login.mutate({ email, password }, {
                onSuccess: () => {
                    navigate('/')
                },
                onError: (err) => {
                    console.error("Login failed:", err.response?.data?.message || err.message)
                },
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
            <div className="w-full max-w-md space-y-6">
                <form onSubmit={handleSubmit}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                        <legend className="fieldset-legend">Login</legend>

                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <label className="label">Password</label>   
                        <input type="password" className="input" placeholder="Password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                        <div className="flex w-full flex-col">
                            <button disabled={login.isPending} className="btn btn-neutral mt-4" type="submit">
                                {login.isPending ? 'Logging in...' : 'Login'}
                            </button>
                            <div className="divider"></div>
                            <Link to="/register" className="btn btn-secondary text-center">
                                Register
                            </Link>
                        </div>

                        {login.isError && <p className="text-red-500">Login failed</p>}
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default LoginPage