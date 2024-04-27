import React, { HTMLProps } from "react";
import clsx from "clsx";

type ContainerProps<T extends HTMLElement> = {
    children: React.ReactNode;
    node: keyof JSX.IntrinsicElements;
} & HTMLProps<T>;

function Container<T extends HTMLElement>({
    children,
    node,
    ...rest
}: ContainerProps<T>) {
    const Tag = node;
    return (
        <Tag
            {...rest}
            className={clsx("tw-px-4 md:tw-px-8 lg:tw-px-16", rest.className)}
        >
            {children}
        </Tag>
    );
}

export default Container;
