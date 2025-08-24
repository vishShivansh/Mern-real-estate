/* eslint-disable no-undef */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      // dispatch(signInStart());
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch(`${API_BASE_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
        // credentials: "include", // Include cookies with the request
      });
      const data = await res.json();
      // if(data.success === false){
      //   dispatch(signInFailure(data.message));
      // }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      // dispatch(signInFailure(error.message));
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-xl uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
