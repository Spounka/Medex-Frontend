import Container from "../../components/ui/container";
import Select from "react-select";
import { IoCheckmark, IoEyeOutline, IoSearchOutline as UilSearch } from "react-icons/io5";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    Button,
    Checkbox,
    Input,
    Label,
    OverlayArrow,
    Tooltip,
    TooltipTrigger,
} from "react-aria-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OpportunityDisplay } from "@domain/opportunity.ts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useAuthToken from "../../hooks/useAuthToken.tsx";
import { PaginatedResult } from "@domain/paginatedResult.ts";
import { CheckboxProps } from "react-aria-components";

function LabelCheckbox({ children, ...props }: CheckboxProps) {
    return (
        <>
            <Checkbox
                className={
                    "tw-flex tw-w-fit tw-cursor-pointer tw-gap-1.5 tw-outline-purple"
                }
                onChange={props.onChange}
                isSelected={props.isSelected}
            >
                {({ isSelected }) => (
                    <>
                        <div
                            className={clsx(
                                "tw-flex tw-h-5 tw-w-5 tw-items-center tw-rounded-[4px] tw-p-0 tw-transition-colors tw-duration-100",
                                isSelected ? "tw-bg-purple" : "tw-bg-gray-300",
                            )}
                        >
                            {isSelected && (
                                <IoCheckmark
                                    className={"tw-h-full tw-w-full tw-stroke-white"}
                                />
                            )}
                        </div>
                        {children}
                    </>
                )}
            </Checkbox>
        </>
    );
}

function calculateRemainingDays(targetDate: Date) {
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
}

function OpportunityCard({ opportunity }: { opportunity: OpportunityDisplay }) {
    const navigate = useNavigate();
    const daysLeft = useMemo<number>(() => {
        return calculateRemainingDays(new Date(opportunity.delivery_date));
    }, [opportunity.delivery_date]);
    return (
        <article
            className={
                "tw-flex tw-min-h-24 tw-w-full tw-min-w-72 tw-cursor-pointer tw-flex-col tw-justify-center tw-gap-4 tw-rounded-md tw-text-lg tw-text-black tw-shadow-[0_0_8px_#00000025]  md:tw-w-fit md:tw-flex-grow-0"
            }
            onClick={() => navigate(`/opportunities/${opportunity.id}`)}
        >
            <div className="tw-flex tw-flex-grow tw-flex-col tw-gap-6 tw-p-4">
                <div className="tw-flex tw-w-full tw-justify-start tw-gap-6">
                    <span className="tw-font-inherit tw-rounded-md tw-bg-purple tw-px-2 tw-py-1 tw-font-poppins tw-text-white">
                        {opportunity.status_display}
                    </span>
                    <span className="tw-flex tw-flex-1 tw-items-center tw-justify-end ">
                        <TooltipTrigger
                            delay={1}
                            closeDelay={2}
                        >
                            <Button
                                className={
                                    "tw-h-auto tw-w-6 tw-cursor-pointer focus:tw-outline-none"
                                }
                            >
                                <IoEyeOutline
                                    className={"tw-h-auto tw-w-6 tw-stroke-purple"}
                                />
                            </Button>
                            <Tooltip>
                                <OverlayArrow />
                                <p className={"tw-font-lg tw-font-poppins tw-text-black"}>
                                    {`${opportunity.views} views`}
                                </p>
                            </Tooltip>
                        </TooltipTrigger>
                    </span>
                </div>
                <h3 className="tw-max-w-[35ch] tw-flex-grow tw-font-tajawal tw-text-black tw-text-inherit md:tw-max-w-[30ch] lg:tw-max-w-[23ch]">
                    {opportunity.title}
                </h3>
                <h4 className="tw-max-w-[25ch] tw-font-poppins tw-font-light tw-text-inherit lg:tw-max-w-[20ch]">
                    {opportunity.tags.reverse().join(", ")}
                </h4>
            </div>
            <div className="tw-border-b tw-border-b-gray-300" />
            <div className="tw-content-center tw-px-4 tw-py-2 tw-align-middle tw-font-poppins tw-text-inherit tw-text-purple">
                <h3 className={"tw-font-semibold"}>{daysLeft}</h3>
                <p className={"tw-text-sm tw-font-light"}>Days To go</p>
            </div>
        </article>
    );
}

async function getOpportunities(access: string | null, page: string) {
    const response = await axios.get<PaginatedResult<OpportunityDisplay>>(
        `${import.meta.env.VITE_BACKEND_URL}/api/opportunity/?l=25&${page ? "p=" + page : ""}`,
        {
            headers: access ? { Authorization: `Bearer ${access}` } : {},
        },
    );
    return response.data;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
}

async function getOpportunitiesTags() {
    const response = await axios.get<Tag[]>(
        `${import.meta.env.VITE_BACKEND_URL}/api/opportunity/tags/`,
    );
    return response.data;
}

const status_list = ["Open", "Closed", "Canceled", "Pending Payment", "Finished"];

function Opportunities() {
    const { t } = useTranslation();
    const { authTokens } = useAuthToken();
    const opportunitiesRef = useRef(null);

    const [enabledTags, setEnabledTags] = useState<Set<string>>(new Set<string>());
    const [enabledStatus, setEnabledStatus] = useState<Set<string>>(new Set<string>());
    const nextPage = useRef<string>("");

    const opportunityQuery = useInfiniteQuery({
        queryFn: async () => getOpportunities(authTokens.access, nextPage.current),
        queryKey: ["opportunities", "page", nextPage.current],
        enabled: authTokens.access !== "",
        initialPageParam: "",
        getNextPageParam: (next, page) => next.next,
    });

    const tagsQuery = useQuery({
        queryFn: async () => getOpportunitiesTags(),
        queryKey: ["opportunities", "tags"],
    });

    const editStatus = (enabled: boolean, name: string) => {
        setEnabledStatus((prevState) => {
            const set = new Set(prevState);
            if (enabled) {
                set.add(name);
            } else {
                set.delete(name);
            }
            return set;
        });
    };

    const editTags = (enabled: boolean, tag: string) => {
        setEnabledTags((prevState) => {
            const set = new Set(prevState);
            if (enabled) {
                set.add(tag);
            } else {
                set.delete(tag);
            }
            return set;
        });
    };

    const applyFilter = (
        opportunity: OpportunityDisplay,
        index?: number,
        array?: OpportunityDisplay[],
    ) => {
        console.log("Apply filter: tags: ", enabledTags, "\t status: ", enabledStatus);
        if (enabledTags.size === 0 && enabledStatus.size === 0) return true;
        const hasTags =
            enabledTags.size > 0
                ? opportunity.tags.some((tag) => enabledTags.has(tag))
                : true;
        const hasStatus = enabledStatus
            ? enabledStatus.has(opportunity.status_display)
            : true;
        return hasTags && hasStatus;
    };

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
                            {status_list.map((status) => {
                                return (
                                    <LabelCheckbox
                                        key={status}
                                        isSelected={enabledStatus.has(status)}
                                        onChange={(e) => editStatus(e, status)}
                                    >
                                        <p>{status}</p>
                                    </LabelCheckbox>
                                );
                            })}
                        </div>
                    </details>
                    <div className="tw-border-b tw-border-b-gray-200" />
                    <details className={"tw-flex tw-flex-col tw-gap-8"}>
                        <summary className={"marker:tw-content-['']"}>Category</summary>
                        <div className="tw-flex tw-flex-col tw-gap-2 tw-py-4 tw-font-poppins">
                            {tagsQuery.data?.map((tag) => {
                                return (
                                    <LabelCheckbox
                                        key={tag.id}
                                        onChange={(e) => editTags(e, tag.name)}
                                        isSelected={enabledTags.has(tag.name)}
                                    >
                                        <p>{tag.name}</p>
                                    </LabelCheckbox>
                                );
                            })}
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
                                "tw-w-full tw-rounded-md lg:tw-w-fit lg:tw-min-w-[22rem] [&>input]:tw-border-gray-300"
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
                    <div
                        className={
                            "tw-grid tw-w-full tw-grid-cols-1 tw-flex-wrap tw-justify-center tw-gap-4 md:tw-grid-cols-2 md:tw-justify-start xl:tw-grid-cols-3 2xl:tw-grid-cols-4"
                        }
                        ref={opportunitiesRef}
                    >
                        {opportunityQuery.data?.pages.map((page) => {
                            return page.results.filter(applyFilter).map((opportunity) => {
                                return (
                                    <OpportunityCard
                                        opportunity={opportunity}
                                        key={opportunity.id}
                                    />
                                );
                            });
                        })}
                    </div>
                    <button
                        className={
                            "tw-w-fit tw-place-self-center tw-rounded-md tw-px-4 tw-py-2 tw-font-poppins tw-outline tw-outline-1 tw-outline-purple"
                        }
                        disabled={
                            !opportunityQuery.hasNextPage ||
                            opportunityQuery.isFetchingNextPage
                        }
                        onClick={() => opportunityQuery.fetchNextPage()}
                    >
                        {opportunityQuery.isFetchingNextPage
                            ? "Loading..."
                            : opportunityQuery.hasNextPage
                              ? "Load More"
                              : "Nothing More to load"}
                    </button>
                </div>
            </div>
        </Container>
    );
}

export default Opportunities;
