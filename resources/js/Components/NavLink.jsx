import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-1 pt-1 leading-5 transition duration-150 ease-in-out focus:outline-none " +
                className
            }
        >
            {children}
        </Link>
    );
}
