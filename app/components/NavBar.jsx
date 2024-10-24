"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, } from "react-bootstrap";
export default function NavBar() {

    const pathname = usePathname();
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        setData(storedData);
    }, [pathname])

    const headerRestrictedPath = [
        "/login",
    ];
    return (
        <>
            <div className="">
                <Navbar className={`navbar navbar-expand-lg bg-body-tertiary  ${headerRestrictedPath.includes(pathname) ? "d-none" : ""
                    }`}>
                    <Container>
                        <Navbar.Brand href="/users">Task</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Logged in as: <a href="/profile"> {data?.Business_Owner?.name}</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>


        </>
    );
}