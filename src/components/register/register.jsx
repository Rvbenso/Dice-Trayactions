import { useState } from "react";
import { useForm } from "react-hook-form"; //Es necesario instalar react-hook-form.
import { supabase } from "../supabase/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import userLogo from "../../assets/userLogo.png";
import emailLogo from "../../assets/emailLogo.png";
import passLogo from "../../assets/passLogo.png";


function Register() {
    
    const { register, formState: { errors }, watch, handleSubmit } = useForm(); //Aqui se prepara el formulario para el envio y se muestran las restricciones de cada apartado.
    
    const SendForm = (data) => {
        console.log(data);  //Aqui se instancia la ruta hacia donde se enviara el formulario ya creado.
        signUpNewUser(data);
    }
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


    return (
        <main
            className="">

            <div className="">
                <form onSubmit={handleSubmit(SendForm)}>
                    <h1 className="">Crear cuenta</h1>

                    {/*Parametro Nombre*/}

                    <div className="">

                        <label className="" for="Name">Nombre</label><br />

                        <div className="">
                            <img src={userLogo} alt="userLogo" className=""></img>
                            <input

                                className=""
                                id="Name"
                                name='user'
                                type='text'
                                placeholder="Introduce tu nombre"
                                {...register
                                    ('user',
                                        {
                                            required: { value: true, message: 'Introduce tu nombre' },
                                            required: { value: true, message: 'Introduce tu nombre' },
                                            maxLength: { value: 15, message: 'El nombre no debe superar los 15 caracteres' }
                                        }
                                    )
                                }></input>
                             
                        </div>
                    </div>

                    {errors.user && <p className="">{errors.user.message}</p>}

                    {/*----------------*/}

                    {/*/Parametro email*/}

                    <div className="">

                        <label className="" for="email">E-mail</label><br />

                        <div className="">
                            <img src={emailLogo} alt="emailLogo" className=""></img>
                            <input
                                className= ""
                                 
                                id="email"
                                name='email'
                                type='text'
                                placeholder="Introduce tu email"
                                {...register
                                    ('email',
                                        {
                                            required: { value: true, message: 'Este campo es obligatorio' },
                                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i, message: 'El formato del email es incorrecto' }
                                        }
                                    )
                                } />
                              
                        </div>
                    </div>

                    {errors.email && <p className="">{errors.email.message}</p>}

                    {/*---------------*/}

                    {/*/Parametro Pass*/}

                    <div className="">

                        <label className="" for="pass">Contraseña </label><br />

                        <div className="">
                            <img src={passLogo} alt="passLogo" className=""></img>
                            <input
                                className=""
                                id="pass"
                                name='pass'
                                type='password'
                                placeholder="Introduce tu contraseña"
                                {...register
                                    ('pass',
                                        {
                                            required: { value: true, message: 'Este campo es obligatorio' },
                                            minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' }
                                        }
                                    )
                                } />
                              
                        </div>
                    </div>

                    {errors.pass && <p className="" >{errors.pass.message}</p>}

                    {/*----------------*/}

                    {/*/Parametro Pass2*/}

                    <div className="">

                        <label className="" for="pass2">Confirma tu contraseña </label><br />

                        <div className="">
                            <img src={passLogo} alt="passLogo" className=""></img>
                            <input
                                className=""
                                id="pass2"
                                name='pass2'
                                type='password'
                                placeholder="Repide tu contraseña"

                                {...register
                                    (
                                        'pass2',
                                        {
                                            required: { value: true, message: 'Este campo es obligatorio' },
                                            minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
                                            validate: value => value === watch('pass') || 'Las contraseñas no coinciden.' //Con esto comparamos las contraseñas con el watch
                                        }
                                    )
                                } />
                        </div>
                    </div>

                    {errors.pass2 && <p className="" >{errors.pass2.message}</p>}
                    {/*----------------*/}

                    <div className="w">
                        <input className="" type="submit" value="Registrarse"></input><br /><br />
                    </div>

                    <hr className="" />
                    <h1 className="">¿Ya tienes cuenta? <Link className="text-blue-700 font-bold" to="/" >Iniciar sesión</Link></h1>
                </form>
            </div>
        </main>
    )
}

export default Register;