import { PrivateCategory, Product } from "@domain/product";
import { City, Country, State } from "@domain/react-country";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { useTranslation } from "react-i18next";

import { IoMailOutline, IoShareSocialOutline } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import coverPic from "../../assets/images/cover.jpg";
import profilePic from "../../assets/images/user.png";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import SupplierProductCard from "../../components/Supplier/shared/SupplierProductCard";
import AuthContext from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../utils/useAxios.tsx";
import { Company } from "@domain/user.ts";
import { Button, Label, Tooltip, TooltipTrigger } from "react-aria-components";
import Container from "../../components/ui/container";
import { toast } from "react-toastify";

const ViewStore = () => {
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);

    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [privateCategories, setPrivateCategories] = useState<PrivateCategory[]>([]);

    const [companyProfilePicture, setCompanyProfilePicture] = useState(profilePic);
    const [companyCoverPicture, setCompanyCoverPicture] = useState(coverPic);

    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [bio, setBio] = useState("");
    const [created, setCreated] = useState("");

    const [country, setCountry] = useState<Country | null>(null);
    const [state, setState] = useState<State | null>();
    const [city, setCity] = useState<City | null>();
    const [postal, setPostal] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const api = useAxios();

    const companyQuery = useQuery({
        queryFn: async () => {
            const result = await api.get<{
                company: Company;
                products: PrivateCategory[];
            }>(import.meta.env.VITE_BACKEND_URL + `/api/company/${id}/`);
            return result.data;
        },
        queryKey: ["company", user?.user_id],
        enabled: !!id,
    });
    const queryClient = useQueryClient();

    // This is for typescript only
    if (!id) return;

    const getUserData = async (user_id: string) => {
        await axios
            .get(
                import.meta.env.VITE_BACKEND_URL + `/api/company/${user_id}/?cat=${true}`,
            )
            .then(
                (
                    res: AxiosResponse<{ company: Company; products: PrivateCategory[] }>,
                ) => {
                    const data = res.data;

                    if (user_id == data.company.user) {
                        GetCountries()
                            .then((res: Country[]) => {
                                let c = res.find(
                                    (x) =>
                                        x.id == parseInt(data?.company.address.country),
                                );
                                if (c) setCountry(c);
                            })
                            .then(() => {
                                return GetState(
                                    parseInt(data?.company.address.country),
                                ).then((res: State[]) => {
                                    if (res.length > 0) {
                                        let s = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.state),
                                        );
                                        setState(s);
                                    }
                                });
                            })
                            .then(() => {
                                return GetCity(
                                    parseInt(data?.company.address.country),
                                    parseInt(data?.company.address.state),
                                ).then((res: City[]) => {
                                    if (res.length > 0) {
                                        let c = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.city),
                                        );
                                        setCity(c);
                                    }
                                });
                            });
                    } else {
                        GetCountries()
                            .then((res: Country[]) => {
                                let c = res.find(
                                    (x) =>
                                        x.id == parseInt(data?.company.address.country),
                                );
                                if (c) setCountry(c);
                            })
                            .then(() => {
                                return GetState(
                                    parseInt(data?.company.address.country),
                                ).then((res: State[]) => {
                                    if (res.length > 0) {
                                        let s = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.state),
                                        );
                                        setState(s);
                                    }
                                });
                            })
                            .then(() => {
                                return GetCity(
                                    parseInt(data?.company.address.country),
                                    parseInt(data?.company.address.state),
                                ).then((res: City[]) => {
                                    if (res.length > 0) {
                                        let c = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.city),
                                        );
                                        setCity(c);
                                    }
                                });
                            });
                    }
                    return data;
                },
            )
            .then((data) => {
                setAddress1(data.company?.address.address_1);
                setAddress2(data.company?.address?.address_2 || "");
                setPostal(data.company?.address.postal_code);
                setCompanyName(data.company?.name);
                setEmail(data.company?.email);
                setPhone(data.company?.phone);
                setCompanyProfilePicture(data.company?.company_profile_picture || "");
                setCompanyCoverPicture(data.company?.company_cover_picture || "");
                setWebsite(data.company?.website || "");
                setBio(data.company?.bio || "");
                setCreated(data.company?.created || "");

                setPrivateCategories(data.products);
            });
    };
    useEffect(() => {
        getUserData(user?.parent ?? user?.user_id ?? "").catch(() => getUserData(id));
    }, []);

    const settings = {
        infinite: true,
        speed: 350,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        lazyLoad: true,
        arrows: false,
        autoplaySpeed: 2500,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                    centerPadding: "30px",
                    centerMode: true,
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    centerMode: false,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    centerMode: true,
                },
            },
            {
                breakpoint: 831,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                },
            },
            {
                breakpoint: 610,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <Container
            node={"main"}
            className="tw-flex tw-flex-col tw-gap-4 tw-bg-white [&&]:tw-pb-12"
        >
            <section>
                <div className="tw-relative tw-h-auto tw-w-full">
                    <div
                        className={
                            "tw-group tw-z-0 tw-h-[40svh] tw-w-full tw-bg-white tw-shadow-sm"
                        }
                    >
                        <img
                            src={companyQuery.data?.company.company_cover_picture ?? ""}
                            alt=""
                            id={"userCoverPicture"}
                            className={
                                "tw-h-full tw-w-full tw-object-cover tw-object-center"
                            }
                        />
                        <div className="tw-absolute tw-right-4 tw-top-4 tw-flex tw-h-10 tw-w-10 tw-flex-col tw-items-center tw-justify-center lg:tw-hidden group-hover:lg:tw-flex">
                            <TooltipTrigger
                                delay={1}
                                closeDelay={2}
                            >
                                <Button
                                    onPress={() => {
                                        navigator.clipboard
                                            .writeText(window.location.href)
                                            .then(() => {
                                                toast.success("Copied Successfully", {
                                                    position: "bottom-right",
                                                    autoClose: 1000,
                                                });
                                            })
                                            .catch((e) => {
                                                console.error(e);
                                                toast.error("Error Copying Text", {
                                                    position: "bottom-right",
                                                    autoClose: 1000,
                                                });
                                            });
                                    }}
                                    className={"tw-h-full tw-w-full"}
                                >
                                    <IoShareSocialOutline
                                        className={"tw-h-full tw-w-full tw-stroke-black"}
                                    />
                                </Button>
                                <Tooltip
                                    className={
                                        "tw-rounded-md tw-bg-white tw-px-2 tw-py-1"
                                    }
                                    placement={"start"}
                                >
                                    <Label>Share</Label>
                                </Tooltip>
                            </TooltipTrigger>
                        </div>
                    </div>
                    <div
                        className={
                            "tw-group tw-absolute tw-bottom-8 tw-left-4 tw-z-10 tw-h-32 tw-w-32 tw-rounded-full tw-border tw-border-purple tw-bg-white tw-p-1 tw-shadow-sm"
                        }
                    >
                        <img
                            src={companyQuery.data?.company.company_profile_picture ?? ""}
                            alt=""
                            id={"userProfilePicture"}
                            className={
                                "tw-h-full tw-w-full tw-rounded-full tw-object-cover"
                            }
                        />
                    </div>
                </div>
            </section>
            <section className="tw-flex tw-flex-col tw-gap-4 tw-rounded-md tw-bg-[white] tw-px-4 tw-py-2">
                <Label
                    className={
                        "tw-font-poppins tw-text-lg tw-font-semibold tw-text-purple lg:tw-text-xl xl:tw-text-4xl"
                    }
                >
                    {companyQuery.data?.company.name}
                </Label>
                <div className="tw-flex tw-items-center tw-gap-3">
                    <IoMailOutline className={"tw-h-6 tw-w-6 tw-stroke-black"} />
                    <Label className={"tw-font-poppins tw-font-medium tw-text-black"}>
                        {companyQuery.data?.company.email}
                    </Label>
                </div>
                <div className="tw-flex tw-items-center tw-gap-3">
                    <Label className={"tw-font-poppins tw-font-light tw-text-gray-400"}>
                        {companyQuery.data?.company.bio}
                    </Label>
                </div>
                <div className="tw-flex tw-items-center tw-gap-3">
                    <Label className={"tw-font-poppins tw-font-light tw-text-gray-400"}>
                        {address1}
                    </Label>
                    <Label className={"tw-font-poppins tw-font-light tw-text-gray-400"}>
                        {address2}
                    </Label>
                    <div className="tw-flex tw-items-center tw-gap-2">
                        <Label
                            className={"tw-font-poppins tw-font-light tw-text-gray-400"}
                        >
                            {country?.name}
                        </Label>
                        <Label
                            className={"tw-font-poppins tw-font-light tw-text-gray-400"}
                        >
                            {city?.name}
                        </Label>
                        <Label
                            className={"tw-font-poppins tw-font-light tw-text-gray-400"}
                        >
                            {state?.name}
                        </Label>
                    </div>
                </div>
                <Link
                    className={"tw-font-poppins tw-text-purple tw-underline"}
                    to={companyQuery.data?.company.website ?? "."}
                >
                    Website
                </Link>
            </section>
            <section className={"tw-flex tw-flex-col tw-gap-8 tw-pt-4"}>
                {privateCategories?.map(
                    (category) =>
                        category.products.length > 0 && (
                            <div
                                className=""
                                key={category.id}
                            >
                                <Label
                                    className={
                                        "tw-font-poppins tw-text-xl tw-font-semibold xl:tw-text-4xl"
                                    }
                                >
                                    {category.name}
                                </Label>
                                <Slider
                                    className={category.products.length < 4 ? "ds" : ""}
                                    {...settings}
                                >
                                    {category.products.map((product) =>
                                        user && user.role === "supplier" ? (
                                            <SupplierProductCard
                                                product={product}
                                                buttonLink={
                                                    "/supplier/products/" + product.sku
                                                }
                                                buttonText={t(
                                                    "supplier_pages.product_details.view",
                                                )}
                                                buttonIcon={<TbListDetails />}
                                                key={product.sku}
                                            />
                                        ) : (
                                            <ProductCard
                                                addToCart={addToCart}
                                                product={product}
                                                cart={true}
                                                key={product.sku}
                                            />
                                        ),
                                    )}
                                </Slider>
                            </div>
                        ),
                )}
            </section>
        </Container>
    );
};

export default ViewStore;
