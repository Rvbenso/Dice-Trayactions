import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LogoGoogle from "../../assets/LogoGoogle.png";
import emailLogo from "../../assets/emailLogo.png";
import passLogo from "../../assets/passLogo.png";
import "../common/Main.css";
import "../common/Forms.css";
import "./Button.css"

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const SendForm = async (data) => {
    console.log(data);
    await signInUser(data);
  };
  {/* ---------- Comparation to Database to do LogIn ---------- */ }
  async function signInUser(data) {
    try {
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Credenciales incorrectas", error.message);
        alert("Credenciales incorrectas");
      } else {
        console.log(signInData);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
      alert("Error al iniciar sesión");
    }
  }

  {/* ---------- Loading creen while init the sesion ---------- */ }
  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard");
      } else {
        console.log("No hay una sesión activa");
        setLoading(false);
      }
    };
    checkUserSession();
  }, [navigate]);

  {/* ---------- Comparation to Database to do LogIn---------- */ }
  const handleOAuthLogin = async (provider) => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) {
        console.error("Error al iniciar sesión con OAuth:", error.message);
      } else {
        console.log("Usuario autenticado con OAuth:", user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error al iniciar sesión con OAuth:", err.message);
    }
  };

  {/* ---------- Errors config ---------- */ }
  const validationRules = (field) => {
    switch (field) {
      case "email":
        return {
          required: "El email es obligatorio",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
            message: "El formato del email es incorrecto",
          },
        };
      case "password":
        return {
          required: "La contraseña es obligatoria",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        };
      default:
        return {};
    }
  };
  const ErrorMessage = ({ error }) => {
    return error ? <p className="text-red-600 ml-13 mt-2">{error.message}</p> : null;
  };

  {/* ---------- Common classes ---------- */ }
  const inputBaseClasses = "focus:border-blue-600 focus:outline-none border-2 rounded-3xl p-2 w-full";




  return (
    <main>
      <section id="loginForm">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(SendForm)} className="relative" id="loginForm">

            <p className="text-3xl text-center font-bold p-2 mb-5 -mt-8">Iniciar sesión</p>

            {/* Campo email de inicio de sesión */}
            <div id="campo">

              <label htmlFor="email">E-mail</label>

              <div id="input">
                <img id="imgLogo" src={emailLogo} alt="emailLogo" />
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Introduce tu E-mail"
                  className={`${inputBaseClasses}
                  ${errors.email ? "border-red-600 not-focus:border-red-600 focus:border-red-600 focus:text-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                  {...register("email", validationRules("email"))}
                />
              </div>

              <ErrorMessage error={errors.email} />
            </div>

            {/* Campo password de inicio de sesión */}
            <div id="campo">
              <label htmlFor="password">Contraseña</label>
              <div id="input">
                <img id="imgLogo" src={passLogo} alt="passLogo" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Introduce tu contraseña"
                  className={`${inputBaseClasses}
                    ${errors.password ? "border-red-600 not-focus:border-red-600 focus:border-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                  {...register("password", validationRules("password"))}
                />
              </div>
              <ErrorMessage error={errors.password} />
            </div>

            <button type="submit"> Iniciar sesión </button>

            <div
              type="button"
              onClick={() => handleOAuthLogin("google")}
              className=" flex relative rounded-3xl p-2 justify-center items-center h-[3rem] border-1 border-gray-600 hover:border-none shadow-lg bg-gray-600 hover:bg-blue-600 text-white text-[6px]">
              <img src={LogoGoogle} alt="Google Logo" className="m-1 pr-1 h-[30px]" />

              <h1 className="relative items-center justify-center flex">Iniciar sesión con Google</h1>
            </div>

            <hr className="my-4 mt-[20px] mb-[20px]" />
            
            <p className="mt-[20px] text-center">
              ¿Eres nuev@? <Link to="/register" className="text-blue-500">Regístrate aquí</Link>
            </p>


          </form>
        )}
      </section>
    </main>
  );
}

export default Login;