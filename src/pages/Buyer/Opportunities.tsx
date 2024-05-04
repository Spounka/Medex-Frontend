import Container from "../../components/ui/container";
import Select from "react-select";
import { IoSearchOutline as UilSearch, IoEyeOutline, IoCheckmark } from "react-icons/io5";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { OverlayArrow, TooltipTrigger, Tooltip, Button } from "react-aria-components";
import * as crypto from "node:crypto";
import { useNavigate } from "react-router-dom";

function LabelCheckbox({
    label,
    checked = false,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange?: () => void;
}) {
    const [isChecked, setIsChecked] = useState(checked);
    return (
        <label
            className={
                "tw-relative tw-flex tw-cursor-pointer tw-items-center tw-gap-2 tw-font-poppins"
            }
        >
            <input
                className={"tw-absolute tw-inset-0 tw-cursor-pointer tw-opacity-0"}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span
                className={clsx(
                    "tw-relative tw-rounded-md tw-outline tw-outline-1 tw-outline-gray-200",
                    isChecked ? "tw-bg-purple tw-p-1" : "tw-bg-white tw-p-3 ",
                )}
            >
                {isChecked && (
                    <IoCheckmark className={"tw-h-auto tw-w-full tw-stroke-white"} />
                )}
            </span>
            <p>{label}</p>
        </label>
    );
}

function OpportunityCard() {
    const navigate = useNavigate();
    return (
        <article
            className={
                "tw-flex-grow-1 tw-flex tw-min-h-24 tw-w-full tw-min-w-24 tw-cursor-pointer tw-flex-col tw-justify-center tw-gap-4 tw-rounded-md tw-text-lg tw-text-black tw-shadow-[0_0_8px_#00000025]  md:tw-w-fit md:tw-flex-grow-0"
            }
            onClick={() => navigate("/opportunities/id")}
        >
            <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
                <div className="tw-flex tw-w-full tw-justify-start tw-gap-6">
                    <span className="tw-font-inherit tw-rounded-md tw-bg-purple tw-px-2 tw-py-1 tw-font-poppins tw-text-white">
                        OPEN
                    </span>
                    <span className="tw-flex tw-flex-1 tw-items-center tw-justify-end ">
                        <TooltipTrigger
                            delay={1}
                            closeDelay={2}
                        >
                            <Button className={"tw-h-auto tw-w-6 tw-cursor-pointer"}>
                                <IoEyeOutline
                                    className={"tw-h-auto tw-w-6 tw-stroke-purple"}
                                />
                            </Button>
                            <Tooltip>
                                <OverlayArrow />
                                <p className={"tw-font-lg tw-font-poppins tw-text-black"}>
                                    {`${Math.floor(Math.random() * 100)} views`}
                                </p>
                            </Tooltip>
                        </TooltipTrigger>
                    </span>
                </div>
                <h3 className="tw-max-w-[35ch] tw-font-tajawal tw-text-black tw-text-inherit lg:tw-max-w-[23ch]">
                    كراسة الشـروط والمواصفات لتقديم خدمة تشييد وتجهيز وتأثيث الخيام لحجاج
                    باكستان بمشعري عرفات ومنى
                </h3>
                <h4 className="tw-font-poppins tw-font-light tw-text-inherit">
                    Event Planning, Catering Services
                </h4>
            </div>
            <div className="tw-border-b tw-border-b-gray-300" />
            <div className="tw-content-center tw-px-4 tw-py-2 tw-align-middle tw-font-poppins tw-text-inherit tw-text-purple">
                <h3 className={"tw-font-semibold"}>5</h3>
                <p className={"tw-text-sm tw-font-light"}>Days To go</p>
            </div>
        </article>
    );
}

function Opportunities() {
    const { t } = useTranslation();
    return (
        <Container
            className={"tw-flex tw-flex-col tw-gap-8 tw-py-8"}
            node={"main"}
        >
            <h1 className="tw-font-algreya tw-text-5xl tw-font-medium">
                Browse Opportunity Marketplace
            </h1>
            <div className="tw-flex tw-flex-col tw-gap-4 lg:tw-flex-row">
                <div className="tw-flex tw-h-min tw-flex-[0_0_20%] tw-flex-col tw-gap-6 tw-rounded-md tw-border tw-border-gray-200 tw-p-4">
                    <details className={"tw-flex tw-flex-col tw-gap-8"}>
                        <summary className={"marker:tw-content-['']"}>Status</summary>
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-py-4 tw-font-poppins">
                            <LabelCheckbox
                                label={"Open"}
                                checked={false}
                            />
                            <LabelCheckbox
                                label={"Pending"}
                                checked={false}
                            />
                            <LabelCheckbox
                                label={"Canceled"}
                                checked={false}
                            />
                        </div>
                    </details>
                    <div className="tw-border-b tw-border-b-gray-200" />
                    <details className={"tw-flex tw-flex-col tw-gap-8"}>
                        <summary className={"marker:tw-content-['']"}>Category</summary>
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-py-4 tw-font-poppins">
                            <LabelCheckbox
                                label={"Medical"}
                                checked={false}
                            />
                            <LabelCheckbox
                                label={"Lab"}
                                checked={false}
                            />
                            <LabelCheckbox
                                label={"Chemicals"}
                                checked={false}
                            />
                        </div>
                    </details>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-6">
                    <div className="tw-flex tw-flex-col tw-gap-4 lg:tw-flex-row lg:tw-gap-6">
                        <Select
                            options={[
                                { value: "date-up", label: "Date Ascending" },
                                { value: "date-down", label: "Date Descending" },
                                { value: "publish-up", label: "Publish Date Ascending" },
                                {
                                    value: "publish-down",
                                    label: "Publish Date Descending",
                                },
                            ]}
                            onChange={() => {}}
                            className={
                                "tw-min-w-[22rem] tw-rounded-md [&>input]:tw-border-gray-300"
                            }
                        />
                        <div
                            className="input-group m-0 tw-w-fit"
                            style={{
                                direction: "ltr",
                            }}
                        >
                            <button
                                type="submit"
                                className="input-group-text tw-border-l-[rgb(187_187_187)]"
                                id="header-search-bar"
                                style={{
                                    borderColor: "#bbbbbb",
                                    backgroundColor: "white",
                                }}
                            >
                                <UilSearch />
                            </button>
                            <input
                                type="text"
                                name="keyword"
                                className="form-control tw-py-1"
                                placeholder={`Search Opportunities`}
                                aria-label={`${t("header.search_product")}...`}
                                aria-describedby="header-search-bar"
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-w-full tw-grid-cols-1 tw-flex-wrap tw-justify-center tw-gap-4 md:tw-grid-cols-2 md:tw-justify-start xl:tw-grid-cols-3 2xl:tw-grid-cols-4">
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                        <OpportunityCard />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Opportunities;
