import Container from "../../components/ui/container";
import { IoDocumentLockOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { OpportunityDisplay } from "@domain/opportunity.ts";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

async function getOpportunity(id: number, access?: string) {
    const result = await axios.get<OpportunityDisplay>(
        `${import.meta.env.VITE_BACKEND_URL}/api/opportunity/${id}/`,
        {
            headers: access ? { Authorization: `Bearer ${access}` } : {},
        },
    );
    return result.data;
}

function calculateRemainingDays(targetDate: Date) {
    const currentDate = new Date();
    const difference = -targetDate.getTime() + currentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
}

function OpportunityDetails(props) {
    const { id: idParam } = useParams();
    if (!idParam) return <div>No Id Provided</div>;
    const id = parseInt(idParam);
    const opportunityQuery = useQuery({
        queryFn: async () => getOpportunity(id),
        queryKey: ["opportunities", id],
        enabled: !!idParam && id > 0,
    });

    const daysLeft = useMemo<number>(() => {
        return calculateRemainingDays(new Date(opportunityQuery?.data?.created ?? ""));
    }, [opportunityQuery?.data?.created]);

    if (opportunityQuery?.isFetching || opportunityQuery.isLoading) return <>Loading..</>;
    return (
        <Container
            node={"main"}
            className={"tw-py-8"}
        >
            <div className="tw-flex tw-flex-col tw-rounded-md tw-p-8 tw-shadow-[0_0_5px_#00000025] lg:tw-flex-row">
                <div className="tw-flex tw-w-full tw-flex-col tw-gap-8">
                    <div className="tw-flex tw-flex-col tw-gap-3">
                        <h1 className="tw-font-cairo tw-text-2xl tw-font-semibold">
                            {opportunityQuery.data?.title}
                        </h1>
                        <p className="tw-text-gray-600">{opportunityQuery.data?.id}</p>
                    </div>
                    <div
                        className={
                            "tw-flex tw-w-full  tw-flex-grow-0 tw-justify-between lg:tw-flex-grow"
                        }
                    >
                        <div className="tw-flex tw-items-center  tw-gap-2 tw-py-8 tw-text-sm">
                            <p className="tw-font-inherit tw-rounded-md tw-bg-purple tw-px-2 tw-py-1 tw-font-poppins tw-text-white">
                                {opportunityQuery.data?.status_display}
                            </p>
                            <p
                                className={
                                    "tw-content-center tw-text-center tw-font-algreya tw-font-light"
                                }
                            >
                                Open {daysLeft} days ago
                            </p>
                        </div>
                        <div className="tw-hidden tw-w-fit tw-items-center tw-justify-between tw-gap-16 tw-rounded-md tw-border tw-border-gray-200 tw-px-4 tw-py-2 lg:tw-flex xl:tw-px-16 xl:tw-py-10">
                            <div className="tw-flex tw-items-center tw-gap-4">
                                <IoDocumentLockOutline className="tw-h-full tw-w-auto tw-min-w-16 tw-stroke-black" />
                                <div className="tw-flex tw-flex-col tw-gap-2">
                                    <h3 className="tw-font-poppins tw-text-xl tw-font-semibold">
                                        Opportunity details are currently hidden
                                    </h3>
                                    <p className="tw-max-w-[55ch] tw-font-poppins tw-font-light">
                                        As a new Medex user firstly you have to be
                                        assigned to business to be able to submit bids.
                                        Then you'll be able to see opportunity details and
                                        submit your bid.
                                    </p>
                                </div>
                            </div>
                            <div className="tw-flex tw-gap-4">
                                <Link
                                    to={"/account/login"}
                                    className="tw-rounded-md tw-bg-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-white"
                                >
                                    Login
                                </Link>
                                <Link
                                    to={"/account/register"}
                                    className="tw-rounded-md tw-border tw-border-purple tw-px-4 tw-py-2 tw-font-poppins tw-font-medium tw-text-purple"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="tw-flex tw-w-fit tw-flex-col tw-gap-2 tw-text-sm">
                        <div className="tw-flex tw-w-fit tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Publisher
                            </p>
                            <p className="tw-font-poppins tw-font-medium tw-text-purple">
                                {opportunityQuery?.data?.user.full_name}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Publish Date
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {new Date(
                                    opportunityQuery.data?.created ?? "",
                                ).toDateString()}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Categories
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {opportunityQuery?.data?.tags.join(", ")}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Delivery Locations
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {opportunityQuery.data?.delivery_address.address_1}
                                <br />
                                {opportunityQuery.data?.delivery_address.city}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Delivery Time
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {new Date(
                                    opportunityQuery.data?.delivery_date_display ?? "",
                                ).toDateString()}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Payment Days
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {opportunityQuery?.data?.payment_days}
                            </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                            <p className="tw-font-algreya tw-text-xl tw-font-extralight">
                                Opportunity Value
                            </p>
                            <p className="tw-font-poppins tw-font-semibold">
                                {opportunityQuery.data?.value_display}
                            </p>
                        </div>
                    </div>
                    <div className="tw-flex tw-w-fit tw-flex-col tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-gray-200 tw-px-4 tw-py-2 lg:tw-hidden xl:tw-px-16 xl:tw-py-10">
                        <div className="tw-flex tw-flex-col tw-items-center tw-gap-4">
                            <IoDocumentLockOutline className="tw-h-full tw-w-auto tw-min-w-16 tw-stroke-black" />
                            <div className="tw-flex tw-flex-col tw-gap-2">
                                <h3 className="tw-font-poppins tw-text-xl tw-font-semibold">
                                    Opportunity details are currently hidden
                                </h3>
                                <p className="tw-max-w-[55ch] tw-font-poppins tw-font-light">
                                    As a new Medex user firstly you have to be assigned to
                                    business to be able to submit bids. Then you'll be
                                    able to see opportunity details and submit your bid.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default OpportunityDetails;
