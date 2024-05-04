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
import Container from "../../components/ui/container";
import { Heading, Tab, TabList, Tabs } from "react-aria-components";
import placeholderCover from "../../assets/images/placeholder-wide.jpg";

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
        const { isValid } = validateFileExtensions(selectedFile, ALLOWED_EXTENSIONS);
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
            .get(import.meta.env.VITE_BACKEND_URL + "/api/product/private-categories/")
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
                },
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
                },
            )
            .then(() => {
                toast.success(`${t("supplier_pages.edit_company.cov_pic_updated")}!`);
            })
            .catch((err) => {
                toast.error(err.data);
            });
    };

    const removeProfilePicture = async () => {
        document.getElementById("userProfilePicture").setAttribute("src", userImage);

        await api
            .post(import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`, {
                delete_profile_picture: true,
            })
            .then(() => {
                toast.success(`${t("supplier_pages.edit_company.pic_removed")}!`);
            });
    };

    const removeCoverPicture = async () => {
        document.getElementById("userCoverPicture").setAttribute("src", coverImage);

        await api
            .post(import.meta.env.VITE_BACKEND_URL + `/api/company/${user.user_id}/`, {
                delete_cover_picture: true,
            })
            .then(() => {
                toast.success(`${t("supplier_pages.edit_company.cov_pic_removed")}!`);
            });
    };

    return (
        <Container
            node={"main"}
            className={"tw-flex tw-flex-col tw-gap-8 [&&]:tw-px-0 [&&]:tw-pt-8"}
        >
            <div className="tw-relative tw-h-auto tw-w-full">
                <img
                    src={placeholderCover}
                    alt=""
                    className={
                        "tw-z-0 tw-h-[40svh] tw-w-full tw-object-cover tw-object-center"
                    }
                />
                <img
                    src={userImage}
                    alt=""
                    className={
                        "tw-absolute tw-bottom-8 tw-left-6 tw-z-10 tw-h-32 tw-w-32 tw-rounded-full tw-border tw-border-gray-600 tw-bg-white tw-object-cover tw-object-center tw-p-1 tw-shadow-sm"
                    }
                />
            </div>

            <Tabs className={"tw-px-4"}>
                <TabList className={"tw-flex tw-gap-4"}>
                    <Tab className={"react-aria-Tab tw-cursor-pointer tw-outline-none"} id={"view-details"}>Personal Information</Tab>
                    <Tab className={"react-aria-Tab tw-cursor-pointer tw-outline-none"} id={"view-categories"}>Category Settings</Tab>
                    <Tab className={"react-aria-Tab tw-cursor-pointer tw-outline-none"} id={"view-products"}>Manage Products</Tab>
                </TabList>
            </Tabs>
        </Container>
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
export default EditStore;
