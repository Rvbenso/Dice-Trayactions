import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/SupabaseClient";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LogoGoogle from "../../assets/LogoGoogle.png";
import emailLogo from "../../assets/emailLogo.png";
import passLogo from "../../assets/passLogo.png";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, formState: { errors }, handleSubmit } = useForm();

  const SendForm = async (data) => {
    console.log(data);
    await signInUser(data);
  };

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


  return (
    <main className="relative overflow-x-hidden bg-[#2e816d] w-screen h-screen bottom-[30px] pt-5 z-1 flex justify-center items-center">
      <section className="shadow-lg flex rounded-2xl bg-[#97c5ba] border-2 p-5 overflow-auto justify-center items-center" id="loginForm">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form onSubmit={handleSubmit(SendForm)} className="relative" id="loginForm">

            <h2 className="text-2xl text-center font-bold p-2 m-2">Iniciar sesión</h2>

            {/* Campo email de inicio de sesión */}
            <div className="flex flex-col justify-center mb-[20px]">
              <label htmlFor="email" className="text-left m-2 font-semibold">E-mail</label>
              <div className="relative flex items-center w-full">
                <img src={emailLogo} alt="emailLogo" className="m-1 h-[30px]" />
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Introduce tu E-mail"
                  className="border-1 rounded-3xl p-2 w-full"
                  {...register
                    ("email", {
                      required: "El email es obligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        message: "El formato del email es incorrecto",
                      },
                    })}
                />
              </div>
              {errors.email && <p className="text-red-600 ml-2 mb-[20px]">{errors.email.message}</p>}
            </div>

            {/* Campo password de inicio de sesión */}
            <div className="flex flex-col justify-center mb-[20px]">
              <label htmlFor="password" className="text-left m-2 font-semibold">Contraseña</label>
              <div className="relative flex items-center w-full">
                <img src={passLogo} alt="passLogo" className="m-1 h-[30px]" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Introduce tu contraseña"
                  className="border-1 rounded-3xl p-2 w-full"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
              </div>
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>
            <div className="relative mt-[30px] mb-[30px] justify-center flex   ">
              <button type="submit" className="border-2 rounded-3xl text-black bg-emerald-500">Iniciar sesión</button>
            </div>

            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              className="flex items-center rounded-3xl text-black p-2 bg-googleRed hover:bg-googleRed-hover transition-colors duration-300"
            >
              <img src={LogoGoogle} alt="Google Logo" className="mr-2 h-[30px]" />
              Iniciar sesión con Google
            </button>

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