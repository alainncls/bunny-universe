import Image from "next/image";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <Image
            src="/logo.png"
            className="mr-2"
            alt="Bunny Universe Logo"
            width="24"
            height="24"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Bunny Universe
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
          <a
            href={"https://element.market/collections/bunny-universe-onlinea"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get a Bunny 🐇
            </Button>
          </a>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavbarLink
            href="https://mirror.xyz/bunnyuniverse.eth/NsjwLQL2wgo2kQYV31l2777amcJ55AKxKuiQDh8Yj6k"
            target="_blank"
            rel="nofollow noopener"
          >
            How is the score computed?
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </header>
  );
}
