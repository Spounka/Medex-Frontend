import { TempUser } from "../types/user.ts";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function useRegisterUser() {
    const { t } = useTranslation();
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    return async (data: TempUser, isSupplier: boolean) => {
        let formData = new FormData();
        formData.append("email", data.email);
        formData.append("full_name", data.full_name);
        formData.append("phone", data.phone);
        formData.append("shipping_address", JSON.stringify(data.shipping_address));
        formData.append("profile_picture", data.profile_picture);
        formData.append("password", data.password);
        formData.append("is_buyer", `${!isSupplier}`);
        formData.append("is_supplier", `${isSupplier}`);
        await axios
            .post(baseURL + "/api/account/supplier/register/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.status === 201) {
                    toast.success(`${t("auth_context.buyer_register_successful")}!`);
                    data.setEmail("");
                    data.setFullName("");
                    data.setPhone("+966");
                    data.setPostalCode("");
                    data.setAddress1("");
                    data.setAddress2("");
                    data.setPassword("");
                    data.setConfirmPassword("");
                    data.pictureRef.current.value = null;
                }
            })
            .catch((err) => {
                let errors = err.response.data;
                Object.keys(errors).forEach((key) => {
                    const args = errors[key];
                    args.forEach((arg: string) => {
                        toast.error(
                            `${key.charAt(0).toUpperCase()}${key
                                .slice(1)
                                .toLowerCase()}: ${arg
                                .charAt(0)
                                .toUpperCase()}${arg.slice(1).toLowerCase()}`,
                        );
                    });
                });
            });
    };
}
