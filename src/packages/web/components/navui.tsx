import React from "react";
import Image from "next/image";
import Link from "next/link";

function NavBrand()
{
    return (
        <div className="navbar-brand">
            <Link href="/">
                <a className="navbar-item">
                    <Image src="/favicon.png" alt="Homebank" width={256} height={256} />
                </a>
            </Link>
        </div>
    );
}

interface NavLinkProps
{
    href: string,
    text: string
}

function NavLink(props: NavLinkProps)
{
    return (
        <Link href={props.href}>
            <a className="navbar-item">{props.text}</a>
        </Link>
    );
}

function Navbar()
{
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <NavBrand />

            <div className="navbar-menu">
                <div className="navbar-end">
                    <NavLink href="/logout" text="Log Out" />
                </div>
            </div>
        </nav>
    );
}

interface TabProps
{
    href: string,
    text: string,
    icon: string,
    activePage: string,
}

function Tab(props: TabProps)
{
    return (
        <li className={props.activePage == props.text ? "is-active" : ""}>
            <a href={props.href}>
                <span className="icon is-small">
                    <i className={"fas fa-" + props.icon} aria-hidden="true"></i>
                </span>
                <span>{props.text}</span>
            </a>
        </li>
    );
}

interface NavUIProps
{
    activePage: string,
}

function ChildTabs(props: NavUIProps)
{
    return (
        <div className="tabs is-centered">
            <ul>
                <Tab href="/childDashboard" text="Dashboard" icon="tachometer-alt" activePage={props.activePage} />
                <Tab href="/childPurchases" text="Purchases" icon="dollar-sign" activePage={props.activePage} />
            </ul>
        </div>
    );
}

function ParentTabs(props: NavUIProps)
{
    return (
        <div className="tabs is-centered">
            <ul>
                <Tab href="/parentDashboard" text="Dashboard" icon="tachometer-alt" activePage={props.activePage} />
                <Tab href="/parentChores" text="Chores" icon="broom" activePage={props.activePage} />
                <Tab href="/parentPurchases" text="Purchases" icon="dollar-sign" activePage={props.activePage} />
                <Tab href="/parentSettings" text="Settings" icon="cogs" activePage={props.activePage} />
            </ul>
        </div>
    );
}

export function ChildNavUI(props: NavUIProps)
{
    return (
        <div className="navContainer">
            <Navbar />
            <ChildTabs activePage={props.activePage} />
        </div>
    );
}

export function ParentNavUI(props: NavUIProps)
{
    return (
        <div className="navContainer">
            <Navbar />
            <ParentTabs activePage={props.activePage} />
        </div>
    );
}