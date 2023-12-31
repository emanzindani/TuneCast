// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [username, setUsername] = useState("");
//   const [errorMesssage, setErrorMessage] = useState("");
//   const Navigate = useNavigate();
//   const [accounts, setAccounts] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const response = await fetch(`http://localhost:8000/api/accounts/`);

//       if (response.ok) {
//         const data = await response.json();
//         setAccounts(data.accounts);
//       }
//     };
//     getData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username) {
//       return;
//     }

//     try {
//       const allAccounts = accounts.map((account) => account.username);
//       if (allAccounts.includes(username)) {
//         Navigate("/password_reset");
//         setErrorMessage("Reset");
//       } else {
//         setErrorMessage("Username does not exist");
//       }
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Error occurred, please try again later");
//     }
//   };

//   return (
//     <div className="vh-100 gradient-custom">
//       <div className="container py-5 h-100">
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-12 col-md-8 col-lg-6 col-xl-5">
//             <div
//               className="card bg-dark text-white"
//               style={{ borderRadius: "1rem" }}
//             >
//               <div className="card-body p-5 text-center">
//                 <div className="mb-md-5 mt-md-4 pb-5">
//                   <h2 className="fw-bold mb-2 text-uppercase">
//                     Forgot Password
//                   </h2>
//                   <p className="text-white-50 mb-5">
//                     Please enter your username to reset your password.
//                   </p>

//                   <div className="form-outline form-white mb-4">
//                     <input
//                       type="text"
//                       id="typeUsernameX"
//                       className="form-control form-control-lg bg-dark text-white border-white"
//                       placeholder="Username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </div>

//                   <button
//                     className="btn btn-outline-light btn-lg px-5"
//                     type="submit"
//                     onClick={handleSubmit}
//                   >
//                     Reset Password
//                   </button>
//                 </div>
//                 <div>
//                   <p className="mb-0">
//                     Remember your password?{" "}
//                     <Link to="/login" className="text-white-50 fw-bold">
//                       Login
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
