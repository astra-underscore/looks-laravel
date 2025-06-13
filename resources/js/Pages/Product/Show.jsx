import {Head, router, useForm, usePage} from "@inertiajs/react";
import {useEffect, useMemo, useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";""
import {arraysAreEqual} from "@/helpers.js";
import {NumericFormat} from "react-number-format";

const Carousel = ({ images }) => {
  if (!images || images.length === 0) {
    return null; // Or some placeholder/fallback
  }

  return (
    <div className="carousel w-full">
      {images.map((image, index) => (
        <div key={index} id={`slide${index}`} className="carousel-item relative w-full">
          <img
            src={image.large} // Using the large version of the image
            className="w-full object-contain"
            alt=""
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide${index === 0 ? images.length - 1 : index - 1}`} className="btn btn-circle">❮</a>
            <a href={`#slide${index === images.length - 1 ? 0 : index + 1}`} className="btn btn-circle">❯</a>
          </div>
        </div>
      ))}
    </div>
  );
};

function Show({product, variationOptions}) {

    const form = useForm({
        option_ids: {},
        quantity: 1,
        price: null
    });

    const {url} = usePage();

    const [selectedOptions, setSelectedOptions] = useState([]);

  //  const images = useMemo(() => {
    //for (let typeId in selectedOptions) {
    //        const option = selectedOptions[typeId];
    //        if (option.images.length > 0) return option.images;
    //    }
    //    return product.images || [];
    //}, [product, selectedOptions]);

    const images = useMemo(() => {
        // First check if there are any selected options
        if (Object.keys(selectedOptions).length > 0) {
            for (let typeId in selectedOptions) {
                const option = selectedOptions[typeId];
                // Check if option exists and has images array
                if (option && option.images && option.images.length > 0) {
                    return option.images;
                }
            }
        }
        // Fallback to product images if no option images found
        return product.images || [];
    }, [product, selectedOptions]);

    useEffect(() => {
      console.log('Images received:', images);
    }, [images]);


    const computedProduct = useMemo(() => {
    // First check if we have valid selectedOptions
    if (!selectedOptions || Object.keys(selectedOptions).length === 0) {
        return {
            price: product.price,
            quantity: product.quantity
        };
    }

    const selectedOptionIds = Object.values(selectedOptions)
        .filter(option => option && option.id) // Filter out any undefined or invalid options
        .map(option => option.id)
        .sort();

    // Only proceed with variation matching if we have valid selectedOptionIds
    if (selectedOptionIds.length > 0 && product.variations) {
        for (let variation of product.variations) {
            if (!variation.variation_type_option_ids) continue;

            const optionIDs = [...variation.variation_type_option_ids].sort();
            if (arraysAreEqual(selectedOptionIds, optionIDs)) {
                return {
                    price: variation.price,
                    quantity: variation.quantity === null
                        ? Number.MAX_SAFE_INTEGER
                        : variation.quantity,
                };
            }
        }
    }

    // Fallback to default product values
    return {
        price: product.price,
        quantity: product.quantity
    };
}, [product, selectedOptions]);

    useEffect(() => {
        for (let type of product.variationsTypes) {
            const selectedOptionId = variationOptions[type.id];
            chooseOption(
                type.id,
                type.options.find(option => option.id === selectedOptionId),
                false
            )
        }
    }, []);

    const getOptionIdsMap = (newOptions) => {
        return Object.fromEntries(
            Object.entries(newOptions)
                .filter(([_, b]) => b && b.id)
                .map(([a, b]) => [a, b.id])
        )
    }

    const chooseOption = (typeId, option, updateRouter = true) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = {...prevSelectedOptions, [typeId]: option};
            if (updateRouter) {
                router.get(url, {
                    options: getOptionIdsMap(newOptions)
                }, {
                    preserveScroll: true,
                    preserveState: true,
                })
            }

            return newOptions;
        })
    }

    const onQuantityChange = (ev) => {
        form.setData('quantity', parseInt(ev.target.value));
    }

    const addToCart = () => {
        form.post(route('cart.store', product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            }
        })
    }

    const renderProductVariationTypes = () => {
        return (
            product.variationsTypes.map((type, i) => (
                <div key={i} className="flex items-center mt-4">
                    <b className="text-xl text-gray-900 dark:text-gray-100 font-bold mr-2">{type.name}</b>
                    {type.type === 'Image' &&
                        <div className="flex gap-2 mb-4">
                            {type.options.map((option) => (
                                <div onClick={() => chooseOption(type.id, option)}
                                     key={option.id}>
                                    {option.images &&
                                        <img src={option.images[0].thumb}
                                             alt=""
                                             className={"w-[50px] rounded-md cursor-pointer" + (
                                             selectedOptions[type.id]?.id === option.id ?
                                                 " outline outline-4 outline-primary" : ""
                                             )}/>}
                                </div>
                            ))}
                        </div>
                    }
                    {type.type === 'Radio' &&
                    <div className="flex join mb-4">
                        {(type.options.map(option => (
                            <input onChange={() => chooseOption(type.id, option)}
                                key={option.id}
                                className="join-item btn"
                                type="radio"
                                value={option.id}
                                checked={selectedOptions[type.id]?.id === option.id}
                                name={'variation_type_' + type.id}
                                aria-label={option.name}/>)))}
                    </div>
                    }
                </div>
            ))
        )
    };


    const renderAddToCartButton = () => {
        return (
            <div className="mb-8 flex gap-4">
                <select value={form.data.quantity}
                        onChange={onQuantityChange}
                        className="select select-bordered w-full">
                    {Array.from({
                        length: Math.min(10, computedProduct.quantity)
                    }).map((el, i) =>
                        <option key={i} value={i + 1}>Cantidad: {i + 1}</option>
                    )}
                </select>
                <button onClick={addToCart}
                        className="btn btn-primary">
                    Agregar al carrito
                </button>
            </div>
        )
    }

    useEffect(() => {
        if (!product?.variationsTypes?.length) return {};

        console.log('Creating idsMap with types:', product.variationsTypes);

        /*
        const idsMap =
            Object.fromEntries(
                Object.entries(selectedOptions)
                    .map(([a, b]) => [a, b.id])
            );
        */
        console.log('selectedOptions:', selectedOptions);
        console.log('selectedOptions entries:', Object.entries(selectedOptions));

        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions)
                .filter(([_, value]) => value && value.id)  // Filter out entries with undefined values or missing id
                .map(([key, value]) => [key, value.id])
        );


        form.setData('option_ids', idsMap);
    }, [selectedOptions]);

    return (
        <AuthenticatedLayout>
            <Head title="Product" />

            <div className="container mx-auto p-8 max-w-7xl sm:px-6 lg:px-8 dark:bg-gray-800">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-7">
                        <Carousel images={images} />
                    </div>
                    <div className="col-span-5">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="flex items-center mt-4">
                            <h2 className="text-xl font-bold mr-2">
                                <NumericFormat value={computedProduct.price}
                                               displayType={'text'}
                                               thousandSeparator={true}
                                               prefix={'$'}
                                               decimalScale={0}
                                               fixedDecimalScale={true}
                                />
                            </h2>
                        </div>
                        {renderProductVariationTypes()}

                        {computedProduct.quantity !== undefined &&
                            computedProduct.quantity < 10 &&
                            <div className="text-error my-4">
                                <span>Solo quedan {computedProduct.quantity}!</span>
                            </div>
                        }

                        {renderAddToCartButton()}

                        <b className="text-xl text-gray-900 dark:text-gray-100 font-bold mb-2">
                            Información del artículo
                        </b>
                        <div className="wysiwyg-output"
                             dangerouslySetInnerHTML={{__html: product.description}}>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}

export default Show;
