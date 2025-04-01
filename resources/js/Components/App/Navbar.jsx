import { Link, usePage } from "@inertiajs/react";
import React from "react";

export default function Navbar(props) {
    const { auth } = usePage().props;
    const { user } = auth;

    return (
        <div class="navbar bg-base-100 shadow-sm">
            <div className="navbar-start"></div>
            <div class="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl">LOOKS</Link>
            </div>
            <div class="navbar-end">
                <div class="flex-none">
                    <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                            <div class="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                                <span class="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <div
                            tabindex="0"
                            class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                            <div class="card-body">
                                <span class="text-lg font-bold">8 Items</span>
                                <span class="text-info">Subtotal: $999</span>
                                <div class="card-actions">
                                    <button class="btn btn-primary btn-block">Ver carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {user && <div class="dropdown dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link href={route('profile.edit')} className="justify-between">
                                    Perfil
                                </Link>
                            </li>
                            <li><Link href={route('logout')}
                                method={"post"}
                                as="buttton">
                                Cerrar sesión
                            </Link>
                            </li>
                        </ul>
                    </div>}
                    {!user && <>
                        <Link href={route('login')} className={"btn px-2 mx-2"}>Iniciar Sesión</Link>
                        <Link href={route('register')} className={"btn btn-primary px-2 mr-2"}>Registrarse</Link>
                    </>}
                </div>
            </div>
        </div>
    );
}