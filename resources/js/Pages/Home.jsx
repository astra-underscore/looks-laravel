import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import ProductItem from "@/Components/App/ProductItem.jsx";

export default function Home({ products }) {

    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="hero bg-base-200 h-[200px]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Bienvenido a LOOKS</h1>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8">
                {products.data.map((product) => (
                    <ProductItem product={product} key={product.id} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
