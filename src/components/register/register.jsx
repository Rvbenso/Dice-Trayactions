import React, { useState } from "react";
import { useForm } from "react-hook-form"; //Es necesario instalar react-hook-form.
import { supabase } from "../supabase/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import userLogo from "../../assets/userLogo.png";
import emailLogo from "../../assets/emailLogo.png";
import passLogo from "../../assets/passLogo.png";
import "../common/Main.css";
import "../common/Forms.css";


function Register() {

    const { register, formState: { errors }, watch, handleSubmit } = useForm(); //Aqui se prepara el formulario para el envio y se muestran las restricciones de cada apartado.

    const SendForm = (data) => {
        console.log(data);  //Aqui se instancia la ruta hacia donde se enviara el formulario ya creado.
        signUpNewUser(data);
    }

    {/* ---------- Comparation to Database to do signUp ---------- */ }
    async function signUpNewUser(dataUser) {
        const { data, error } = await supabase.auth.signUp(
            {
                email: dataUser.email,
                password: dataUser.pass,
            }
        );
        if (error) {
            console.error("Esta cuenta ya esta registrada", error.message);
            alert("Esta cuenta ya esta registrada");
        } else {
            console.log(data);
            const { error: insertError } = await supabase
                .from('profiles') // Tabla de supabase
                .upsert({ id: data.user.id, username: dataUser.user }); // usa el campo user y lo inserta en el id ya registrado
            if (insertError) {
                console.error("Error inserting username:", insertError.message);
                alert("Error al registrar el nombre de usuario");
            } else {
                console.log("User signed up and username inserted successfully:", data);
                navigate("/dashboard")
            }
        }
    }

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
            case "password2":
                return {
                    required: "La contraseña es obligatoria",
                    minLength: {
                        value: 6,
                        message: "La contraseña debe tener al menos 6 caracteres",
                    },
                    validate: value => value === watch('pass') || 'Las contraseñas deben ser iguales',
                };

            case "user":
                return {
                    required: "La contraseña es obligatoria",
                    maxLength: {
                        value: 15,
                        message: "El usuario no debe tener mas de 15 caracteres",
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
            <section id="registerForm">

                <form onSubmit={handleSubmit(SendForm)}>
                    <p className="text-3xl text-center font-bold p-2 mb-5 -mt-8">Crear cuenta</p>

                    {/*User parametter*/}

                    <div id="campo">

                        <label htmlFor="user">Nombre</label>

                        <div id="input">
                            <img id="imgLogo" src={userLogo} alt="userLogo"></img>
                            <input
                                id="user"
                                name='user'
                                type='text'
                                placeholder="Introduce tu nombre"
                                className={`${inputBaseClasses}
                                ${errors.user ? "border-red-600 not-focus:border-red-600 focus:border-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                                {...register("user", validationRules("user"))}></input>
                        </div>
                    </div>

                    <ErrorMessage error={errors.user} />


                    {/*Email parametter*/}

                    <div id="campo">

                        <label htmlFor="email">E-mail</label>

                        <div id="input">
                            <img id="imgLogo" src={emailLogo} alt="emailLogo"></img>
                            <input
                                id="email"
                                name='email'
                                type='text'
                                placeholder="Introduce tu email"
                                className={`${inputBaseClasses}
                                ${errors.password ? "border-red-600 not-focus:border-red-600 focus:border-red-600 focus:text-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                                {...register("email", validationRules("email"))}
                            />

                        </div>
                    </div>

                    <ErrorMessage error={errors.email} />

                    {/*---------------*/}

                    {/*/Password parametter*/}

                    <div id="campo">

                        <label htmlFor="password">Contraseña </label>
                        <div id="input">
                            <img id="imgLogo" src={passLogo} alt="passLogo"></img>
                            <input
                                id="password"
                                name='password'
                                type='password'
                                placeholder="Introduce tu contraseña"
                                className={`${inputBaseClasses}
                                ${errors.password ? "border-red-600 not-focus:border-red-600 focus:border-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                                {...register("password", validationRules("password"))} />

                        </div>
                    </div>

                    <ErrorMessage error={errors.password} />

                    {/*----------------*/}

                    {/*/Password2 parametter*/}

                    <div id="campo">

                        <label htmlFor="password2">Confirma tu contraseña </label>

                        <div id="input">
                            <img id="imgLogo" src={passLogo} alt="passLogo"></img>
                            <input

                                id="password2"
                                name='password2'
                                type='password'
                                placeholder="Repide tu contraseña"
                                className={`${inputBaseClasses}
                                ${errors.password ? "border-red-600 not-focus:border-red-600 focus:border-red-600" : "not-focus:border-black border-blue-600 focus:border-blue-600"}`}
                                {...register("password2", validationRules("password2"))} />
                        </div>
                    </div>

                    <ErrorMessage error={errors.password2} />
                    {/*----------------*/}

                    <button type="submit"> Registrarse </button>

                    <hr className="my-4 mt-[20px] mb-[20px]" />

                    <p className="mt-[20px] text-center">¿Ya tienes cuenta? <Link className="text-blue-700 font-bold" to="/" >Iniciar sesión</Link></p>
                </form>

            </section>
        </main>
    );
}

export default Register;