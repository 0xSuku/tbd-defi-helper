import React from "react";
import {
    Navbar,
    Collapse,
    NavbarBrand,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Button,
} from "reactstrap";
import Logo from "./Logo";
import ConnectWallet from "../components/connector/ConnectMetamask";
import useWallet from "../context/wallet/useWallet";
import Connected from "../components/connector/Connected";
import './header.scss';

const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const { wallet } = useWallet();

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const Handletoggle = () => {
        setIsOpen(!isOpen);
    };
    const showMobilemenu = () => {
        document.getElementById("sidebarArea")?.classList.toggle("showSidebar");
    };
    return (
        <Navbar dark expand="md" className="the-navbar fix-header">
            <div className="d-flex align-items-center">
                <div className="d-lg-block d-none me-5 pe-3 logo-container">
                    <Logo />
                </div>
                <NavbarBrand href="/">
                </NavbarBrand>
                <Button
                    color="primary"
                    className=" d-lg-none"
                    onClick={() => showMobilemenu()}
                >
                    <i className="bi bi-list"></i>
                </Button>
            </div>
            <div className="hstack gap-2">
                <Button
                    color="primary"
                    size="sm"
                    className="d-sm-block d-md-none"
                    onClick={Handletoggle}
                >
                    {isOpen ? (
                        <i className="bi bi-x"></i>
                    ) : (
                        <i className="bi bi-three-dots-vertical"></i>
                    )}
                </Button>
            </div>

            <Collapse navbar isOpen={isOpen}>
                <div className="d-flex justify-content-end flex-grow-1">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle color="transparent" className="dd-toggle">
                            {
                                !wallet.isConnected ?
                                    <ConnectWallet /> :
                                    <Connected {...wallet}></Connected>
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            {
                                wallet.isConnected ? (
                                    <>
                                        <DropdownItem>My Account</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>My Balance</DropdownItem>
                                        <DropdownItem>Disconnect</DropdownItem>
                                    </>
                                ) : <></>
                            }
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Collapse>
        </Navbar>
    );
};

export default Header;
