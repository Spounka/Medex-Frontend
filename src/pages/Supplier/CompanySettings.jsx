import { useContext, useEffect, useRef, useState } from "react";

import {
  CitySelect,
  CountrySelect,
  GetCity,
  GetCountries,
  GetState,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import {
  BsGlobeEuropeAfrica,
  BsPhoneVibrate,
  BsSignpost2,
} from "react-icons/bs";
import { CiLink } from "react-icons/ci";
import { FaRegBuilding } from "react-icons/fa";
import {
  MdLocationCity,
  MdOutlineFolderDelete,
  MdOutlineLocationOn,
} from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { TfiEmail, TfiLocationArrow } from "react-icons/tfi";

import coverImage from "../../assets/images/cover.jpg";
import userImage from "../../assets/images/user.png";

import useAxios from "../../utils/useAxios";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

import { Link } from "react-router-dom";

import { validateFileExtensions } from "../../utils/ValidateFiles";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX =
  /^\+?[0-9]{1,3}\s?[-.()]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,5}\s?[-.]?\s?[0-9]{1,9}$/;

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];

const CompanySettings = () => {
  const { t, i18n } = useTranslation();

  const { user } = useContext(AuthContext);

  const api = useAxios();

  const [userId, setUserId] = useState("");

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

  const fileRef = useRef();

  const handleFileChange = (e, type) => {
    const selectedFile = Array.from(e.target.files);
    const { isValid } = validateFileExtensions(
      selectedFile,
      ALLOWED_EXTENSIONS
    );
    if (!isValid) {
      toast.error(t("buyer_pages.profile.file_type_err"));
      fileRef.current.value = null;
    } else {
      if (type === "pp") {
        setCompanyProfilePicture(selectedFile[0]);

        reRenderPicture(e.target.files[0]);

        changeProfilePicture(e);
      } else {
        setCompanyCoverPicture(selectedFile[0]);

        reRenderCoverPicture(e.target.files[0]);

        changeCoverPicture(e);
      }
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const validateEmail = EMAIL_REGEX.test(email);
    const validatePhone = PHONE_REGEX.test(phone);

    if (!validateEmail) {
      toast.error(`${t("buyer_pages.profile.email_err")}.`);
      return;
    }

    if (!validatePhone) {
      if (phone.length < 4) {
        toast.error(`${t("buyer_pages.profile.ph_length")}.`);
      } else {
        toast.error(`${t("buyer_pages.profile.ph_err")}.`);
      }
      return;
    }

    const address = {
      country: country.id,
      state: state?.id,
      city: city?.id,
      postal_code: postal,
      address_1: address1,
      address_2: address2,
    };

    let formData = new FormData();
    formData.append("email", email);
    formData.append("name", companyName);
    formData.append("phone", phone);
    formData.append("website", website);
    formData.append("address", JSON.stringify(address));

    await api
      .patch(
        import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`,
        formData
      )
      .then(() => {
        toast.success(`${t("buyer_pages.profile.updated")}!`);
      });
  };

  const getUserData = async () => {
    await api
      .get(import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`)
      .then((res) => {
        const data = res.data.company;

        if (user.user_id == data.supplier) {
          GetCountries()
            .then((res) => {
              let c = res.find((x) => x.id == parseInt(data.address.country));
              setCountry(c);
              handleCountryChange(c);
            })
            .then(() => {
              return GetState(parseInt(data.address.country)).then((res) => {
                if (res.length > 0) {
                  let s = res.find((x) => x.id == parseInt(data.address.state));
                  setState(s);
                  handleStateChange(data.address.country, s);
                }
              });
            })
            .then(() => {
              return GetCity(
                parseInt(data.address.country),
                parseInt(data.address.state)
              ).then((res) => {
                if (res.length > 0) {
                  let c = res.find((x) => x.id == parseInt(data.address.city));
                  setCity(c);
                }
              });
            });
        } else {
          GetCountries()
            .then((res) => {
              let c = res.find((x) => x.id == parseInt(data.address.country));
              setCountry(c.name);
            })
            .then(() => {
              return GetState(parseInt(data.address.country)).then((res) => {
                if (res.length > 0) {
                  let s = res.find((x) => x.id == parseInt(data.address.state));
                  setState(s.name);
                }
              });
            })
            .then(() => {
              return GetCity(
                parseInt(data.address.country),
                parseInt(data.address.state)
              ).then((res) => {
                if (res.length > 0) {
                  let c = res.find((x) => x.id == parseInt(data.address.city));
                  setCity(c.name);
                }
              });
            });
        }

        setUserId(data?.supplier);
        setAddress1(data?.address.address_1);
        setAddress2(data?.address?.address_2 || "");
        setPostal(data?.address.postal_code);
        setCompanyName(data?.name);
        setEmail(data?.email);
        setPhone(data?.phone);
        setCompanyProfilePicture(data?.company_profile_picture || "");
        setCompanyCoverPicture(data?.company_cover_picture || "");
        setWebsite(data?.website || "");
      });
  };

  useEffect(() => {
    getUserData();

    if (userId == user.user_id) {
      const countryInput = document.querySelector(
        "#country > div.col-sm-9 > div > div > div > input"
      );

      countryInput.setAttribute("required", true);
    }
  }, []);

  const changeProfilePicture = async (e) => {
    e.preventDefault();

    if (!e.target.files[0]) {
      return;
    }

    let formData = new FormData();
    formData.append("profile_picture", e.target.files[0]);

    await api
      .post(
        import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      )
      .then(() => {
        toast.success(`${t("supplier_pages.edit_company.pic_updated")}!`);
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  const changeCoverPicture = async (e) => {
    e.preventDefault();

    if (!e.target.files[0]) {
      return;
    }

    let formData = new FormData();
    formData.append("cover_picture", e.target.files[0]);

    await api
      .post(
        import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      )
      .then(() => {
        toast.success(`${t("supplier_pages.edit_company.cov_pic_updated")}!`);
      })
      .catch((err) => {
        toast.error(err.data);
      });
  };

  const removeProfilePicture = async () => {
    document
      .getElementById("userProfilePicture")
      .setAttribute("src", userImage);

    await api
      .post(
        import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`,
        {
          delete_profile_picture: true,
        }
      )
      .then(() => {
        toast.success(`${t("supplier_pages.edit_company.pic_removed")}!`);
      });
  };

  const removeCoverPicture = async () => {
    document.getElementById("userCoverPicture").setAttribute("src", coverImage);

    await api
      .post(
        import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`,
        {
          delete_cover_picture: true,
        }
      )
      .then(() => {
        toast.success(`${t("supplier_pages.edit_company.cov_pic_removed")}!`);
      });
  };

  return (
    <main className="px-0 px-md-3">
      <section>
        <div className="container-xxl">
          <Link
            to="../../settings"
            className="d-flex align-items-center"
            style={{ color: "#8e65c1" }}
          >
            {i18n.resolvedLanguage == "en" ? (
              <AiOutlineArrowLeft className="mb-2" />
            ) : (
              <AiOutlineArrowRight className="mb-2" />
            )}{" "}
            <h5 className="fw-normal">{t("supplier_pages.setting.back")}</h5>{" "}
          </Link>
          <div className="main-body">
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4" style={{ border: "none" }}>
                  <div className="card-body">
                  <h3>Cover photo</h3>
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={
                          companyCoverPicture ? companyCoverPicture : coverImage
                        }
                        alt="Cover Picture"
                        id="userCoverPicture"
                        className="shadow border-2 object-fit-contain w-100"
                        height={350}
                      />
                      <div>
                        {userId == user.user_id && (
                          <form encType="multipart/form-data">
                            <div className="mt-5 d-flex justify-content-between gap-5 align-items-center">
                              <button
                                type="button"
                                onClick={removeCoverPicture}
                                className="btn btn-outline-danger d-flex gap-2 align-items-center"
                              >
                                {t("supplier_pages.edit_company.rem_cov_pic")}
                                <MdOutlineFolderDelete size="1.4rem" />
                              </button>
                              <input
                                id="companyCoverPicture"
                                name="companyCoverPicture"
                                type="file"
                                className="d-none"
                                ref={fileRef}
                                onChange={(e) => handleFileChange(e, "cp")}
                              />
                              <button
                                type="button"
                                onClick={handleCoverFileUpload}
                                className="btn btn-outline-primary d-flex gap-2 align-items-center"
                              >
                                {t(
                                  "supplier_pages.edit_company.update_cov_pic"
                                )}
                                <TbPhotoEdit size="1.4rem" />
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mt-3">
                <div className="card mb-4" style={{ border: "none" }}>
                  <div className="card-body">
                  <h3>Cover photo</h3>
                    <div className="d-flex flex-column align-items-center text-center">
                      <img
                        src={
                          companyProfilePicture
                            ? companyProfilePicture
                            : userImage
                        }
                        alt="Picture"
                        id="userProfilePicture"
                        className="rounded-circle shadow border-2 object-fit-cover"
                        width={150}
                        height={150}
                      />
                      <div>
                        {userId == user.user_id && (
                          <form encType="multipart/form-data">
                            <div className="mt-5 d-flex justify-content-between gap-5 align-items-center">
                              <button
                                type="button"
                                onClick={removeProfilePicture}
                                className="btn btn-outline-danger d-flex gap-2 align-items-center"
                              >
                                {t("buyer_pages.profile.rem_pic")}
                                <MdOutlineFolderDelete size="1.4rem" />
                              </button>
                              <input
                                id="companyProfilePicture"
                                name="companyProfilePicture"
                                type="file"
                                className="d-none"
                                ref={fileRef}
                                onChange={(e) => handleFileChange(e, "pp")}
                              />
                              <button
                                type="button"
                                onClick={handleFileUpload}
                                className="btn btn-outline-primary d-flex gap-2 align-items-center"
                              >
                                {t("buyer_pages.profile.update_pic")}
                                <TbPhotoEdit size="1.4rem" />
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 mt-3">
                <div className="card" style={{ border: "none" }}>
                  <div className="card-title p-4 pb-0 profile__title">
                    <h3>{t("buyer_pages.profile.company")}</h3>
                  </div>
                  <div className="card-body">
                    {userId == user.user_id && (
                      <form method="post" onSubmit={handlesubmit}>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <FaRegBuilding size="1.5rem" />
                              {t("supplier_pages.edit_company.name")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <CiLink size="1.8rem" />
                              {t("supplier_pages.edit_company.website")}
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="url"
                              className="form-control"
                              value={website}
                              placeholder={
                                t("supplier_pages.edit_company.website") + "..."
                              }
                              onChange={(e) => setWebsite(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <TfiEmail size="1.4rem" />
                              {t("supplier_pages.edit_company.email")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div
                          className="row mb-3 d-flex align-items-center"
                          id="country"
                        >
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <BsGlobeEuropeAfrica size="1.4rem" />
                              {t("country")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <CountrySelect
                              defaultValue={country}
                              onChange={(e) => {
                                setCountry(e);
                                handleCountryChange(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <TfiLocationArrow size="1.4rem" />
                              {t("state")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary" id="state">
                            <StateSelect
                              defaultValue={state}
                              countryid={country.id}
                              onChange={(e) => {
                                setState(e);
                                handleStateChange(country.id, e);
                              }}
                              placeHolder={`${t("select_state")}`}
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <MdLocationCity size="1.4rem" />
                              {t("city")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary" id="city">
                            <CitySelect
                              countryid={country.id}
                              stateid={state.id}
                              defaultValue={city}
                              onChange={(e) => {
                                setCity(e);
                              }}
                              placeHolder={`${t("select_city")}`}
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <BsSignpost2 size="1.4rem" />
                              {t("postal")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={postal}
                              onChange={(e) => setPostal(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <MdOutlineLocationOn size="1.4rem" />
                              {t("address1")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={address1}
                              onChange={(e) => setAddress1(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <MdOutlineLocationOn size="1.4rem" />
                              {t("address2")}
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={address2}
                              onChange={(e) => setAddress2(e.target.value)}
                              placeholder={`${t("address2")}...`}
                            />
                          </div>
                        </div>
                        <div className="row mb-3 d-flex align-items-center">
                          <div className="col-sm-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                              <BsPhoneVibrate size="1.4rem" />
                              {t("supplier_pages.edit_company.phone")} *
                            </h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <PhoneInput
                              countryCodeEditable={false}
                              name="phone"
                              specialLabel=""
                              required={true}
                              inputClass="w-100"
                              value={phone}
                              id="phone"
                              onChange={(e) => setPhone(e)}
                            />
                          </div>
                        </div>

                        <div className="row mt-5">
                          <div className="col-sm-3"></div>
                          <div className="col-sm-9 text-secondary">
                            <button
                              type="submit"
                              className="p-2 gradient-bg-color text-white border-0 px-5 d-flex gap-2 align-items-center"
                              style={{
                                borderRadius: "5px",
                              }}
                            >
                              {t("supplier_pages.edit_company.edit")}

                              <BiEditAlt size="1.4rem" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const handleCountryChange = (e) => {
  GetState(parseInt(e.id)).then((result) => {
    let stateSelect = document.querySelector("#state .stdropdown-input>input");
    let citySelect = document.querySelector("#city .stdropdown-input>input");

    if (result.length > 0) {
      stateSelect.setAttribute("required", true);
      stateSelect.removeAttribute("disabled");
      citySelect.removeAttribute("disabled");
    } else {
      stateSelect.setAttribute("disabled", true);
      citySelect.setAttribute("disabled", true);
    }
  });
};

const handleStateChange = (countryId, e) => {
  GetCity(parseInt(countryId), parseInt(e.id)).then((result) => {
    let citySelect = document.querySelector("#city .stdropdown-input>input");

    if (result.length > 0) {
      citySelect.setAttribute("required", true);
      citySelect.removeAttribute("disabled");
    } else {
      citySelect.setAttribute("disabled", true);
    }
  });
};

const handleFileUpload = () => {
  let input = document.getElementById("companyProfilePicture");
  input.click();
};

const handleCoverFileUpload = () => {
  let input = document.getElementById("companyCoverPicture");
  input.click();
};

const reRenderPicture = (picture) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    document
      .getElementById("userProfilePicture")
      .setAttribute("src", event.target.result);
    userImage;
  };

  reader.readAsDataURL(picture);
};

const reRenderCoverPicture = (picture) => {
  let reader = new FileReader();

  reader.onload = (event) => {
    document
      .getElementById("userCoverPicture")
      .setAttribute("src", event.target.result);
    coverImage;
  };

  reader.readAsDataURL(picture);
};

export default CompanySettings;
