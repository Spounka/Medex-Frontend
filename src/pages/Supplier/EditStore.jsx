import { useState, useEffect, useContext, useRef } from "react";
import useAxios from "../../utils/useAxios";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import coverImage from "../../assets/images/cover.jpg";
import userImage from "../../assets/images/user.png";
import AuthContext from "../../context/AuthContext";
import { MdOutlineFolderDelete } from "react-icons/md";
import { TbPhotoEdit } from "react-icons/tb";
import { validateFileExtensions } from "../../utils/ValidateFiles";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];

const EditStore = () => {
  const api = useAxios();

  const { t, i18n } = useTranslation();
  const [companyProfilePicture, setCompanyProfilePicture] = useState(null);
  const [companyCoverPicture, setCompanyCoverPicture] = useState(null);
  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("");

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [selectedCat, setSelectedCat] = useState("");
  const [isLoading, setLoading] = useState(false);
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
  const getUserData = async () => {
    await api
      .get(import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`)
      .then((res) => {
        const data = res.data.company;
        setCompanyProfilePicture(data?.company_profile_picture || "");
        setCompanyCoverPicture(data?.company_cover_picture || "");
        setUserId(data?.supplier);
      });
  };
  const getUserCategories = async () => {
    await api
      .get(
        import.meta.env.VITE_BACKEND_URL + "/api/product/private-categories/"
      )
      .then((res) => {
        if (res?.data?.private_categories) {
          setCategories(res?.data?.private_categories);
        }
        if (res?.data?.products) {
          setProducts(res?.data?.products);
        }
      });
  };

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getUserCategories();
    getUserData();
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
          <div className="main-body">
            <div className="row pb-5">
              <h2 className="d-flex align-items-center gap-2 dashboard__title mt-2">
                {t("supplier_pages.edit_store.title")}
              </h2>
              <div className="col-lg-12 mt-3">
                <div className="card border shadow">
                  <div id="tab" className="card-body d-flex flex-column">
                    <div className="gap-3 d-flex flex-wrap justify-content-center">
                      <button className="btn btn-primary">
                        <Link
                          style={{ color: "white" }}
                          to="#createC"
                          data-bs-toggle="collapse"
                        >
                          {t("supplier_pages.edit_store.add_cat")}
                        </Link>
                      </button>
                      <button className="btn btn-primary">
                        <Link
                          style={{ color: "white" }}
                          to="#addP"
                          data-bs-toggle="collapse"
                        >
                          {t("supplier_pages.edit_store.manage_products")}
                        </Link>
                      </button>
                      <button className="btn btn-danger">
                        <Link
                          style={{ color: "white" }}
                          to="#removeC"
                          data-bs-toggle="collapse"
                        >
                          {t("supplier_pages.edit_store.del_cat")}
                        </Link>
                      </button>
                    </div>

                    <div className="collapse" id="addP" data-bs-parent="#tab">
                      <form>
                        <label htmlFor="sel" className="label-form mt-4">
                          {t("supplier_pages.edit_store.select_cat")}
                        </label>
                        <select
                          id="sel"
                          className="form-select mt-3"
                          style={{
                            maxWidth: "700px",
                          }}
                          defaultValue={selectedCat}
                          onChange={(event) =>
                            setSelectedCat(event.currentTarget.value)
                          }
                        >
                          <option value="">
                            {t("supplier_pages.edit_store.select_cat")}
                          </option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </form>
                      {selectedCat !== "" && (
                        <table className="table table-bordered mt-3">
                          <tbody>
                            {products.map((prod, index) => {
                              const selectedCategory = categories.find(
                                (category) => {
                                  return (
                                    parseInt(category.id) ===
                                    parseInt(selectedCat)
                                  );
                                }
                              );

                              const isProductExisting =
                                selectedCategory &&
                                selectedCategory.products.some(
                                  (product) => product.sku === prod.sku
                                );

                              return (
                                <tr
                                  className="d-flex justify-content-between"
                                  key={index}
                                >
                                  <td
                                    style={{
                                      borderLeft: "none",
                                      borderRight: "none",
                                    }}
                                  >
                                    {prod.name}
                                  </td>
                                  <td
                                    style={{
                                      borderLeft: "none",
                                      borderRight: "none",
                                    }}
                                  >
                                    <button
                                      className={`btn ${
                                        isProductExisting
                                          ? "btn-outline-danger"
                                          : "btn-outline-primary"
                                      }`}
                                      disabled={isLoading}
                                      id={prod.sku}
                                      onClick={async (e) => {
                                        setLoading(true);
                                        await api
                                          .post(
                                            import.meta.env.VITE_BACKEND_URL +
                                              "/api/product/private-categories/",
                                            {
                                              category_id: selectedCat,
                                              product_id: e.target.id,
                                              add: !isProductExisting,
                                            }
                                          )
                                          .then(() => {
                                            toast.success(
                                              t(
                                                isProductExisting
                                                  ? "supplier_pages.edit_store.product_delete_success"
                                                  : "supplier_pages.edit_store.product_create_success"
                                              )
                                            );
                                            setLoading(false);
                                            getUserCategories();
                                          })
                                          .catch((err) => {
                                            toast.error(
                                              err?.response?.data?.error
                                            );
                                            setLoading(false);
                                          });
                                      }}
                                    >
                                      {isProductExisting
                                        ? t("supplier_pages.edit_store.rem_pro")
                                        : t(
                                            "supplier_pages.edit_store.add_pro"
                                          )}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>

                    <div
                      className="collapse"
                      id="createC"
                      data-bs-parent="#tab"
                    >
                      <form
                        method="post"
                        className="mt-3"
                        onSubmit={handleSubmit(async (data) => {
                          setLoading(true);
                          await api
                            .post(
                              import.meta.env.VITE_BACKEND_URL +
                                "/api/product/private-categories/",
                              {
                                categoryName: data.name,
                              }
                            )
                            .then(() => {
                              toast.success(
                                t(
                                  "supplier_pages.edit_store.category_create_success"
                                )
                              );

                              reset();
                              setLoading(false);
                              getUserCategories();
                            })
                            .catch((err) => {
                              toast.error(err?.response?.data?.error);
                              setLoading(false);
                            });
                        })}
                      >
                        <label className="form-label" htmlFor="in">
                          {t("supplier_pages.edit_store.add_cat")}
                        </label>
                        <input
                          {...register("name")}
                          id="in"
                          className="form-control"
                          placeholder={t(
                            "supplier_pages.edit_store.cat_placeholder"
                          )}
                          type="text"
                          style={{
                            borderRight: "1px solid #cccccc",
                          }}
                        />
                        <button
                          type="submit"
                          className="btn btn-primary mt-2"
                          disabled={isLoading}
                        >
                          {isLoading
                            ? t("supplier_pages.edit_store.loading") + " ..."
                            : t("supplier_pages.edit_store.add_cat")}
                        </button>
                      </form>
                    </div>

                    <div
                      className="collapse"
                      id="removeC"
                      data-bs-parent="#tab"
                    >
                      <table className="table table-bordered mt-3">
                        <tbody>
                          {categories.map((cat, index) => (
                            <tr
                              className="d-flex justify-content-between"
                              key={index}
                            >
                              <td
                                style={{
                                  borderLeft: "none",
                                  borderRight: "none",
                                }}
                              >
                                {cat.name}
                              </td>
                              <td
                                style={{
                                  borderLeft: "none",
                                  borderRight: "none",
                                }}
                              >
                                <button
                                  className="btn btn-outline-danger"
                                  disabled={isLoading}
                                  id={cat.id}
                                  onClick={async (e) => {
                                    setLoading(true);
                                    const categoryID = e?.target?.id;

                                    await api
                                      .delete(
                                        import.meta.env.VITE_BACKEND_URL +
                                          `/api/product/private-categories/`,
                                        {
                                          data: {
                                            categoryID,
                                          },
                                        }
                                      )
                                      .then(() => {
                                        toast.success(
                                          t(
                                            "supplier_pages.edit_store.category_delete_success"
                                          )
                                        );
                                        setLoading(false);

                                        getUserCategories();
                                      })
                                      .catch((err) => {
                                        toast.error(err?.response?.data?.error);
                                        setLoading(false);
                                      });
                                  }}
                                >
                                  {t("supplier_pages.edit_store.rem_cat")}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      style={{maxHeight:350}}
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
                              {t("supplier_pages.edit_company.update_cov_pic")}
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
                  <h3>Profile photo</h3>
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
          </div>
        </div>
      </section>
    </main>
  );
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
  }
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
export default EditStore;
