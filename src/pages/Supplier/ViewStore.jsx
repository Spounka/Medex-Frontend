import React, { useState, useContext, useEffect } from "react";

import { GetState, GetCity, GetCountries } from "react-country-state-city";

import userImage from "../../assets/images/user.png";
import coverImage from "../../assets/images/cover.jpg";

import useAxios from "../../utils/useAxios";

import AuthContext from "../../context/AuthContext";

import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { FaRegEnvelope } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder, MdPhoneIphone } from "react-icons/md";
import { IoEarthSharp, IoLocationOutline } from "react-icons/io5";
import ProductCard from "../../components/Buyer/shared/ProductCard";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useWishlistHandler from "../../utils/useWishlistHandler";
import Slider from "react-slick";

const ViewStore = (props) => {
  const { t } = useTranslation();
  const { addToCart } = props;

  const api = useAxios();

  const { user } = useContext(AuthContext);

  const [privateCategories, setPrivateCategories] = useState([]);

  const [companyProfilePicture, setCompanyProfilePicture] = useState(null);
  const [companyCoverPicture, setCompanyCoverPicture] = useState(null);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const getUserData = async (user_id) => {
    await api
      .get(
        import.meta.env.VITE_BACKEND_URL +
          `/api/company/${user_id}/?cat=${true}`
      )
      .then((res) => {
        const data = res.data;

        if (user_id == data.company.supplier) {
          GetCountries()
            .then((res) => {
              let c = res.find(
                (x) => x.id == parseInt(data?.company.address.country)
              );
              setCountry(c);
            })
            .then(() => {
              return GetState(parseInt(data?.company.address.country)).then(
                (res) => {
                  if (res.length > 0) {
                    let s = res.find(
                      (x) => x.id == parseInt(data?.company.address.state)
                    );
                    setState(s);
                  }
                }
              );
            })
            .then(() => {
              return GetCity(
                parseInt(data?.company.address.country),
                parseInt(data?.company.address.state)
              ).then((res) => {
                if (res.length > 0) {
                  let c = res.find(
                    (x) => x.id == parseInt(data?.company.address.city)
                  );
                  setCity(c);
                }
              });
            });
        } else {
          GetCountries()
            .then((res) => {
              let c = res.find(
                (x) => x.id == parseInt(data?.company.address.country)
              );
              setCountry(c.name);
            })
            .then(() => {
              return GetState(parseInt(data?.company.address.country)).then(
                (res) => {
                  if (res.length > 0) {
                    let s = res.find(
                      (x) => x.id == parseInt(data?.company.address.state)
                    );
                    setState(s.name);
                  }
                }
              );
            })
            .then(() => {
              return GetCity(
                parseInt(data?.company.address.country),
                parseInt(data?.company.address.state)
              ).then((res) => {
                if (res.length > 0) {
                  let c = res.find(
                    (x) => x.id == parseInt(data?.company.address.city)
                  );
                  setCity(c.name);
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

        setPrivateCategories(data?.products);
      });
  };
  useEffect(() => {
    if (user.role === "supplier") {
      getUserData(user.user_id);
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
      height: "35vw",
      backgroundImage: `url(${coverImage})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
    },
  });
  const useStyles2 = makeStyles({
    Background: {
      width: "25vw",
      height: "25vw",
      backgroundImage: `url(${userImage})`,
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

  // const handleWishlist = useWishlistHandler();
  // const [p, setP] = useState([]);

  // const [isInWishlist, setIsInWishlist] = useState(false);
  // const handleWishButtonClick = () => {
  //   if (user) {
  //     try {
  //       handleWishlist(p.sku, wish);
  //     } catch {
  //       return;
  //     }
  //     setIsInWishlist(!isInWishlist);
  //   }
  // };
  return (
    <main className="px-0 px-md-3">
      <section>
        <div className="container-xxl">
          <h1>Store</h1>
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
            <h2>Company Details</h2>
            <div className="p-3 d-flex align-items-center gap-3">
              <FaRegEnvelope size="1.2rem" />{" "}
              <div className="d-flex flex-column">
                <h5 style={{ margin: "0" }}>Email</h5>
                {email}
              </div>
            </div>
            {phone && (
              <div className="p-3 d-flex align-items-center gap-3">
                <MdPhoneIphone size="1.2rem" />{" "}
                <div className="d-flex flex-column">
                  <h5 style={{ margin: "0" }}>Phone</h5>
                  {phone}
                </div>
              </div>
            )}
            {website && (
              <div className="p-3 d-flex align-items-center gap-3">
                <IoEarthSharp size="1.2rem" />{" "}
                <div className="d-flex flex-column">
                  <h5 style={{ margin: "0" }}>Website</h5>
                  {website}
                </div>
              </div>
            )}
            <div className="p-3 d-flex align-items-center gap-3">
              <IoLocationOutline size="1.2rem" />{" "}
              <div className="d-flex flex-column">
                <h5 style={{ margin: "0" }}>Location</h5>
                {country.name && country.name + ", "}
                {city && city + ", "}
                {state && state + ", "}
                {address1 && address1 + ", "}
                {address2 && address2 + ", "}
              </div>
            </div>
          </div>
          {privateCategories.map((category) => (
            category.products.length > 0 &&
            <div className="row container-fluid">
              <h2>{category.name}</h2>
              {privateCategories.length > 0 ? (
                <Slider
                  className={category.products.length < 5 ? "ds" : ""}
                  {...settings}
                >
                  {category.products.map((product) => (
                    <ProductCard
                      product={product}
                      cart={true}
                      key={product.sku}
                    />
                  ))}
                </Slider>
              ) : (
                <p className="text-center">{t("buyer_pages.home.none")}!</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ViewStore;
