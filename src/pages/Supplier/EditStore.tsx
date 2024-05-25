import { useState, useEffect, useContext, useRef, FormEvent, ChangeEvent } from "react";
import useAxios from "../../utils/useAxios";

import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { useTranslation } from "react-i18next";
import coverImage from "../../assets/images/cover.jpg";
import userImage from "../../assets/images/user.png";
import AuthContext from "../../context/AuthContext";
import { validateFileExtensions } from "../../utils/ValidateFiles";
import Container from "../../components/ui/container";
import { IoPencilSharp, IoRemoveCircleOutline } from "react-icons/io5";
import {
    Button,
    Form,
    Heading,
    Input,
    Label,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    TextArea,
    TextField,
} from "react-aria-components";
import placeholderCover from "../../assets/images/placeholder-wide.jpg";
import company from "../Buyer/Company.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Company } from "@domain/user.ts";
import { PrivateCategory } from "@domain/product.ts";

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "svg"];

const EditStore = () => {
    const api = useAxios();
    const personalInfoRef = useRef(null);

    const { t, i18n } = useTranslation();
    const { user, authTokens } = useContext(AuthContext);
    const [userId, setUserId] = useState("");

    const [categories, setCategories] = useState([]);

    const [products, setProducts] = useState([]);

    const [selectedCat, setSelectedCat] = useState("");

    const companyQuery = useQuery({
        queryFn: async () => {
            const result = await api.get<{
                company: Company;
                products: PrivateCategory[];
            }>(import.meta.env.VITE_BACKEND_URL + `/api/company/${user?.user_id}/`);
            return result.data;
        },
        queryKey: ["company", user?.user_id],
        enabled: !!user?.user_id,
    });
    const queryClient = useQueryClient();
    const handleInformationSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        for (const [key, value] of formData) {
            if (!value) formData.set(key, companyQuery.data?.company[key]);
        }
        await companyMutation.mutateAsync(formData);
    };
    const companyMutation = useMutation({
        mutationFn: async (data: FormData, post = false) => {
            data.append("partial", true);
            if (post)
                await api.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/company/${user?.user_id}/`,
                    data,
                    { headers: { Authorization: `Bearer ${authTokens.access}` } },
                );
            else
                await api.patch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/company/${user?.user_id}/`,
                    data,
                    { headers: { Authorization: `Bearer ${authTokens.access}` } },
                );
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(["company"]);
            personalInfoRef.current?.reset();
            toast.success("Company successfully updated!");
        },
        onError: async (error) => {
            console.error(error);
            toast.error("Error updating company");
        },
    });

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
        const selectedFile = Array.from(e.target.files ?? []);
        const { isValid } = validateFileExtensions(selectedFile, ALLOWED_EXTENSIONS);
        if (!isValid) {
            toast.error(t("buyer_pages.profile.file_type_err"));
        } else {
            if (type === "pp") {
                reRenderPicture(e.target?.files?.[0] ?? "");
                await changeProfilePicture(e);
            } else {
                reRenderCoverPicture(e.target?.files?.[0] ?? "");
                await changeCoverPicture(e);
            }
        }
    };
    const getUserData = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + `/api/company/${user?.user_id}/`)
            .then((res) => {
                const data = res.data.company;
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
        document.getElementById("userCoverPicture")!.setAttribute("src", coverImage);

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
                <div
                    className={
                        "tw-w-fulltw-bg-white tw-group tw-z-0 tw-h-[40svh] tw-shadow-sm"
                    }
                >
                    <img
                        src={
                            companyQuery.data?.company.company_cover_picture ??
                            placeholderCover
                        }
                        alt=""
                        id={"userCoverPicture"}
                        className={"tw-h-full tw-w-full tw-object-cover tw-object-center"}
                    />
                    <div className="tw-absolute tw-bottom-4 tw-right-4 tw-hidden tw-flex-col tw-gap-1 group-hover:tw-flex">
                        <Label
                            elementType={"label"}
                            className="tw-flex tw-h-12 tw-w-12 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-p-2 hover:tw-animate-pulse focus:tw-outline-none group-hover:tw-flex"
                        >
                            <Input
                                type={"file"}
                                accept={"image/*"}
                                onChange={(e) => handleFileChange(e, "cp")}
                                className={
                                    "tw-absolute tw-left-1 tw-top-1 tw-hidden tw-h-1 tw-w-1"
                                }
                            />
                            <IoPencilSharp
                                className={"tw-h-full tw-w-full tw-fill-purple"}
                            />
                        </Label>
                        <Button
                            onPress={removeCoverPicture}
                            className="tw-flex tw-h-12 tw-w-12 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-p-2 hover:tw-animate-pulse focus:tw-outline-none group-hover:tw-flex"
                        >
                            <IoRemoveCircleOutline
                                className={"tw-h-full tw-w-full tw-stroke-purple"}
                            />
                        </Button>
                    </div>
                </div>
                <div
                    className={
                        "tw-group tw-absolute tw-bottom-8 tw-left-6 tw-z-10 tw-h-32 tw-w-32 tw-rounded-full tw-border tw-border-purple tw-bg-white tw-p-1 tw-shadow-sm"
                    }
                >
                    <img
                        src={
                            companyQuery.data?.company.company_profile_picture ??
                            userImage
                        }
                        alt=""
                        id={"userProfilePicture"}
                        className={"tw-h-full tw-w-full tw-rounded-full tw-object-cover"}
                    />
                    <div className="tw-absolute tw-bottom-0 tw-right-0 tw-hidden tw-flex-col tw-gap-1 group-hover:tw-flex">
                        <Label
                            elementType={"label"}
                            className="tw-flex tw-h-10 tw-w-10 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-p-2 hover:tw-animate-pulse focus:tw-outline-none group-hover:tw-flex"
                        >
                            <Input
                                type={"file"}
                                accept={"image/*"}
                                onChange={(e) => handleFileChange(e, "pp")}
                                className={
                                    "tw-absolute tw-left-1 tw-top-1 tw-hidden tw-h-1 tw-w-1"
                                }
                            />
                            <IoPencilSharp
                                className={"tw-h-full tw-w-full tw-fill-purple"}
                            />
                        </Label>
                        <Button
                            onPress={() => removeProfilePicture()}
                            className="tw-flex tw-h-10 tw-w-10 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-white tw-p-2 hover:tw-animate-pulse focus:tw-outline-none group-hover:tw-flex"
                        >
                            <IoRemoveCircleOutline
                                className={"tw-h-full tw-w-full tw-stroke-purple"}
                            />
                        </Button>
                    </div>
                </div>
            </div>

            <Tabs className={"tw-flex tw-flex-col tw-gap-8 tw-px-4"}>
                <TabList className={"tw-flex tw-gap-4"}>
                    <Tab
                        className={"react-aria-Tab tw-cursor-pointer tw-outline-none"}
                        id={"view-details"}
                    >
                        Personal Information
                    </Tab>
                    <Tab
                        className={"react-aria-Tab tw-cursor-pointer tw-outline-none"}
                        id={"view-categories"}
                    >
                        Category Settings
                    </Tab>
                    <Tab
                        className={"react-aria-Tab tw-cursor-pointer tw-outline-none"}
                        id={"view-products"}
                    >
                        Manage Products
                    </Tab>
                </TabList>
                <TabPanel id={"view-details"}>
                    <Form
                        ref={personalInfoRef}
                        onSubmit={handleInformationSubmit}
                        className={"tw-flex tw-flex-col tw-gap-4 tw-pb-8"}
                    >
                        <div className="tw-flex tw-flex-col tw-gap-4 xl:tw-w-[28%]">
                            <TextField
                                className={
                                    "tw-flex tw-w-full tw-flex-col tw-gap-2 rac-focus:tw-outline-none"
                                }
                                name={"name"}
                            >
                                <Label>Name: </Label>
                                <Input
                                    placeholder={`${companyQuery.data?.company.name}`}
                                    className={
                                        "tw-rounded-md tw-bg-gray-200 tw-px-2 tw-py-1 tw-font-poppins tw-font-light tw-text-black"
                                    }
                                />
                            </TextField>
                            <TextField
                                className={
                                    "tw-flex tw-w-full tw-flex-col tw-gap-2 rac-focus:tw-outline-none"
                                }
                                name={"email"}
                            >
                                <Label>Email: </Label>
                                <Input
                                    placeholder={`${companyQuery.data?.company.email}`}
                                    className={
                                        "tw-rounded-md tw-bg-gray-200 tw-px-2 tw-py-1 tw-font-poppins tw-font-light tw-text-black"
                                    }
                                />
                            </TextField>
                            <TextField
                                className={
                                    "tw-flex tw-w-full tw-flex-col tw-gap-2 rac-focus:tw-outline-none"
                                }
                                name={"website"}
                            >
                                <Label>Website: </Label>
                                <Input
                                    placeholder={`${companyQuery.data?.company.website}`}
                                    className={
                                        "tw-rounded-md tw-bg-gray-200 tw-px-2 tw-py-1 tw-font-poppins tw-font-light tw-text-black"
                                    }
                                />
                            </TextField>
                            <TextField
                                className={
                                    "tw-flex tw-w-full tw-flex-col tw-gap-2 rac-focus:tw-outline-none"
                                }
                                name={"register"}
                            >
                                <Label>Commercial Register: </Label>
                                <Input
                                    placeholder={`${companyQuery.data?.company.register ?? ""}`}
                                    className={
                                        "tw-rounded-md tw-bg-gray-200 tw-px-2 tw-py-1 tw-font-poppins tw-font-light tw-text-black"
                                    }
                                />
                            </TextField>
                            <TextField
                                className={
                                    "tw-flex tw-w-auto tw-flex-col tw-gap-2 rac-focus:tw-outline-none"
                                }
                                name={"bio"}
                            >
                                <Label>Bio: </Label>
                                <TextArea
                                    placeholder={`${companyQuery.data?.company.bio}`}
                                    className={
                                        "tw-rounded-md tw-bg-gray-200 tw-px-2 tw-py-1 tw-font-poppins tw-font-light tw-text-black"
                                    }
                                />
                            </TextField>
                        </div>
                        <div
                            className={
                                "tw-flex tw-w-full tw-flex-row tw-justify-end tw-gap-4"
                            }
                        >
                            <Button
                                type={"submit"}
                                className={
                                    "tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-light tw-text-white tw-outline-none focus:tw-outline-none"
                                }
                            >
                                Submit
                            </Button>
                            <Button
                                type={"reset"}
                                className={
                                    "tw-rounded-md tw-bg-red-400 tw-px-4 tw-py-2 tw-font-poppins tw-font-light tw-text-white tw-outline-none focus:tw-outline-none"
                                }
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </TabPanel>
                <TabPanel id={"view-categories"}>
                    <Form>Hello there</Form>
                </TabPanel>
                <TabPanel id={"view-products"}>Products Hello there</TabPanel>
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
