import { Product } from "@domain/product";
import { City, Country, State } from "@domain/react-country";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GetCity, GetCountries, GetState } from "react-country-state-city";
import { useTranslation } from "react-i18next";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa";
import { IoEarthSharp, IoLocationOutline } from "react-icons/io5";
import { MdOutlineDescription, MdPhoneIphone } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import coverPic from "../../assets/images/cover.jpg";
import profilePic from "../../assets/images/user.png";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import SupplierProductCard from "../../components/Supplier/shared/SupplierProductCard";
import AuthContext from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const ViewStore = () => {
    const { t } = useTranslation();
    const { addToCart } = useContext(CartContext);

    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const [privateCategories, setPrivateCategories] = useState<
        {
            id: number;
            name: string;
            products: Product[];
            supplier: string;
        }[]
    >([]);

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

    // This is for typescript only
    if (!id) return;

    const getUserData = async (user_id: string) => {
        await axios
            .get(
                import.meta.env.VITE_BACKEND_URL + `/api/company/${user_id}/?cat=${true}`,
            )
            .then((res) => {
                const data = res.data;

                console.log(data);

                if (user_id == data.company.supplier) {
                    GetCountries()
                        .then((res: Country[]) => {
                            let c = res.find(
                                (x) => x.id == parseInt(data?.company.address.country),
                            );
                            if (c) setCountry(c);
                        })
                        .then(() => {
                            return GetState(parseInt(data?.company.address.country)).then(
                                (res: State[]) => {
                                    if (res.length > 0) {
                                        let s = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.state),
                                        );
                                        setState(s);
                                    }
                                },
                            );
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data?.company.address.country),
                                parseInt(data?.company.address.state),
                            ).then((res: City[]) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id == parseInt(data?.company.address.city),
                                    );
                                    setCity(c);
                                }
                            });
                        });
                } else {
                    GetCountries()
                        .then((res: Country[]) => {
                            let c = res.find(
                                (x) => x.id == parseInt(data?.company.address.country),
                            );
                            if (c) setCountry(c);
                        })
                        .then(() => {
                            return GetState(parseInt(data?.company.address.country)).then(
                                (res: State[]) => {
                                    if (res.length > 0) {
                                        let s = res.find(
                                            (x) =>
                                                x.id ==
                                                parseInt(data?.company.address.state),
                                        );
                                        setState(s);
                                    }
                                },
                            );
                        })
                        .then(() => {
                            return GetCity(
                                parseInt(data?.company.address.country),
                                parseInt(data?.company.address.state),
                            ).then((res: City[]) => {
                                if (res.length > 0) {
                                    let c = res.find(
                                        (x) =>
                                            x.id == parseInt(data?.company.address.city),
                                    );
                                    setCity(c);
                                }
                            });
                        });
                }

                setAddress1(data?.company?.address.address_1);
                setAddress2(data?.company?.address?.address_2 || "");
                setPostal(data?.company?.address.postal_code);
                setCompanyName(data?.company?.name);
                setEmail(data?.company?.email);
                setPhone(data?.company?.phone);
                setCompanyProfilePicture(data?.company?.company_profile_picture || "");
                setCompanyCoverPicture(data?.company?.company_cover_picture || "");
                setWebsite(data?.company?.website || "");
                setBio(data?.company?.bio || "");
                setCreated(data?.company?.created || "");

                setPrivateCategories(data?.products);
            });
    };
    useEffect(() => {
        if (user) {
            if (user.role === "supplier") {
                if (user.parent !== null) {
                    getUserData(user.parent);
                } else {
                    getUserData(user.user_id);
                }
            } else {
                getUserData(id);
            }
        } else {
            getUserData(id);
        }
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
    const useStyles = makeStyles({
        Background: {
            width: "100%",
            height: "30vw",
            backgroundImage: `url(${
                companyCoverPicture ? companyCoverPicture : coverPic
            })`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
        },
    });
    const useStyles2 = makeStyles({
        Background: {
            width: "20vw",
            height: "20vw",
            backgroundImage: `url(${
                companyProfilePicture ? companyProfilePicture : profilePic
            })`,
            backgroundColor: "white",
            borderRadius: "50%",
            border: "5px solid white",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            marginLeft: "20px",
            marginTop: "-5vw",
            marginRight: "20px",
        },
    });

    const classes = useStyles();
    const classes2 = useStyles2();

    return (
        <main
            className="mt-2 px-0 px-md-3"
            style={{ backgroundColor: "rgb(249 249 249)" }}
        >
            <section>
                <div className="container-xxl">
                    <h1>{t("supplier_pages.settings.store")}</h1>
                    <div style={{ backgroundColor: "white" }}>
                        <div className={classes.Background} />
                        <div className="p-2">
                            <div className="d-flex justify-content-start">
                                <div className="d-flex flex-column align-items-center gap-0 gap-md-3">
                                    <div className={classes2.Background} />
                                    <h2>{companyName}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="container-fluid my-4 p-3"
                        style={{ backgroundColor: "white" }}
                    >
                        <h2>{t("buyer_pages.profile.company")}</h2>
                        <div className="p-3 d-flex align-items-center gap-3">
                            <FaRegEnvelope size="1.2rem" />
                            <div className="d-flex flex-column">
                                <h5 style={{ margin: "0" }}>{t("email")}</h5>
                                {email}
                            </div>
                        </div>
                        {phone && (
                            <div className="p-3 d-flex align-items-center gap-3">
                                <MdPhoneIphone size="1.2rem" />
                                <div className="d-flex flex-column">
                                    <h5 style={{ margin: "0" }}>{t("phone")}</h5>
                                    {phone}
                                </div>
                            </div>
                        )}
                        {website && (
                            <div className="p-3 d-flex align-items-center gap-3">
                                <IoEarthSharp size="1.2rem" />
                                <div className="d-flex flex-column">
                                    <h5 style={{ margin: "0" }}>
                                        {t("supplier_pages.edit_company.website")}
                                    </h5>
                                    {website}
                                </div>
                            </div>
                        )}

                        {bio && (
                            <div className="p-3 d-flex align-items-center gap-3">
                                <MdOutlineDescription size="1.2rem" />
                                <div className="d-flex flex-column">
                                    <h5 style={{ margin: "0" }}>
                                        {t("supplier_pages.settings.bio")}
                                    </h5>
                                    {bio}
                                </div>
                            </div>
                        )}

                        {created && (
                            <div className="p-3 d-flex align-items-center gap-3">
                                <CiCalendarDate size="1.2rem" />
                                <div className="d-flex flex-column">
                                    <h5 style={{ margin: "0" }}>
                                        {t("supplier_pages.settings.created")}
                                    </h5>
                                    {created}
                                </div>
                            </div>
                        )}

                        <div className="p-3 d-flex align-items-center gap-3">
                            <IoLocationOutline size="1.2rem" />
                            <div className="d-flex flex-column">
                                <h5 style={{ margin: "0" }}>{t("location")}</h5>
                                {country && country.name}
                                {state && `, ${state.name}`}
                                {city && `, ${city.name}`}
                                {postal && ` ${postal}`}
                                {address1 && `, ${address1}`}
                                {address2 && `, ${address2}`}
                            </div>
                        </div>
                    </div>
                    {privateCategories?.map(
                        (category) =>
                            category.products.length > 0 && (
                                <div
                                    className="mb-5"
                                    key={category.id}
                                >
                                    <h2>{category.name}</h2>
                                    {privateCategories.length > 0 ? (
                                        <Slider
                                            className={
                                                category.products.length < 4 ? "ds" : ""
                                            }
                                            {...settings}
                                        >
                                            {category.products.map((product) =>
                                                user && user.role === "supplier" ? (
                                                    <SupplierProductCard
                                                        product={product}
                                                        buttonLink={
                                                            "/supplier/products/" +
                                                            product.sku
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
                                    ) : (
                                        <p className="text-center">
                                            {t("buyer_pages.home.none")}!
                                        </p>
                                    )}
                                </div>
                            ),
                    )}
                </div>
            </section>
        </main>
    );
};

export default ViewStore;
