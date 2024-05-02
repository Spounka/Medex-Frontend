import { ReactNode } from "react";
import { Link } from "react-router-dom";

export function CategoryLink({ to, icon, text }: { to: string; text: string; icon: ReactNode; }) {
    return (
        <div
            className={"tw-flex tw-h-full tw-flex-[0_0_30%] tw-justify-center tw-fill-purple tw-text-black lg:tw-flex-1 "}
        >
            <Link
                to={to}
                className="tw-flex tw-w-min tw-flex-col tw-items-center tw-justify-center tw-gap-4"
            >
                <div
                    className={"tw-cursor-pointer tw-rounded-full tw-bg-[#FAFAFAFF] tw-p-8 tw-transition-all tw-duration-300"}
                >
                    {icon}
                </div>
                <p
                    className="tw-m-0 tw-text-center tw-duration-300"
                    style={{ transition: "0.3s" }}
                >
                    {text}
                </p>
            </Link>
        </div>
    );
}
