import { useTranslation } from "react-i18next";

import useAxios from "../../utils/useAxios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TbTruckReturn } from "react-icons/tb";

import userImage from "../../assets/images/user.png";

const ReturnRequests = () => {
    const { t } = useTranslation();

    const [returnRequests, setReturnRequests] = useState({});

    const api = useAxios();

    const getReturnRequests = async () => {
        await api
            .get(import.meta.env.VITE_BACKEND_URL + "/api/order/return/list/")
            .then((res) => {
                setReturnRequests(res.data);
                console.log(res.data);
            });
    };

    useEffect(() => {
        getReturnRequests();
    }, []);

    return (
        <main className="px-0 px-md-3">
            <section>
                <div className="container-fluid">
                    <h2 className="fw-bold d-flex align-items-center gap-2 dashboard__title">
                        <TbTruckReturn size="2.5rem" />
                        {t("supplier_sidebar.return_requests")}
                    </h2>
                </div>
                <div className="row">
                    {returnRequests.length > 0 ? (
                        returnRequests.map((request) => {
                            return (
                                <div className="col-12 mt-4" key={request.id}>
                                    <Link
                                        to={`/supplier/return-requests/${request.id}`}
                                        className="w-100"
                                    >
                                        <div className="card p-3 shadow">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-4">
                                                    <img
                                                        src={
                                                            request.user.profile
                                                                .profilePicture
                                                                ? import.meta
                                                                      .env
                                                                      .VITE_BACKEND_URL +
                                                                  request.user
                                                                      .profile
                                                                      .profilePicture
                                                                : userImage
                                                        }
                                                        alt="User"
                                                        className=" rounded-circle border"
                                                        width={60}
                                                        height={60}
                                                    />

                                                    <div className="d-flex flex-column gap-2">
                                                        <h4 className="m-0">
                                                            {
                                                                request.user
                                                                    .full_name
                                                            }
                                                        </h4>
                                                        <p className="m-0">
                                                            {
                                                                request.product
                                                                    ?.product
                                                                    ?.name
                                                            }{" "}
                                                            *{" "}
                                                            {
                                                                request?.product
                                                                    ?.quantity
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="badge bg-primary p-2 fw-bold d-flex align-items-center gap-1">
                                                    {request?.created_date}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p className="mt-3 text-center">
                            {t("supplier_pages.return_list.none")}!
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ReturnRequests;
