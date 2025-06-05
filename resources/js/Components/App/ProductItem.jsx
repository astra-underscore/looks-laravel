import React from 'react';
import {Link} from '@inertiajs/react';
import {NumericFormat} from "react-number-format";

const ProductItem = ({product}) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <Link href={route('product.show', product.slug)}>
                <figure>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-cover object-center aspect-square"
                    />
                </figure>
            </Link>
            <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>
                    en <Link href="/" className="hover:underline">{product.department.name}</Link>
                </p>
                <div className="card-actions items-center justify-between mt-3">
                    <button className="btn btn-primary">Añadir al carrito</button>
                    <span className="text-2xl">
                        <NumericFormat value={product.price}
                                       displayType={'text'}
                                       thousandSeparator={true}
                                       prefix={'$'}
                                       decimalScale={0}
                                       fixedDecimalScale={true}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;
