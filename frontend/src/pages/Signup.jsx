import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();
  const name = useField("name");
  const email = useField("email");
  const password = useField("password");
  const gender = useField("gender");
  const date_of_birth = useField("date_of_birth");
  const occupation = useField("occupation");
  const phone = useField("phone");

  const { signup, error } = useSignup("/api/users/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      date_of_birth: date_of_birth.value,
      occupation: occupation.value,
      phone: phone.value,

    });
    if (!error) {
      console.log("success");
      setIsAuthenticated(true);
      navigate("/");
      
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>

        <label>name:</label>
        <input {...name} />
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <label>gender:</label>
        <input {...gender} />
        <label>date_of_birth:</label>
        <input {...date_of_birth} />
        <label>occupation:</label>
        <input {...occupation} />
        <label>phone:</label>
        <input {...phone} />

        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;