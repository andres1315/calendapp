import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/logo.png"
import logoFull from "../../assets/logoFul.png"
import { useNavBarStore } from "../../hooks/useNavBarStore";


export const NavbarCalendar = () => {

  const {navbarLinks,onChangeTab} =useNavBarStore()
  return (
    <Navbar fluid rounded className="bg-rose-100/60 mb-2">
      <Navbar.Brand href="#">
        <img
          src={logo}
          className="mr-3 h-8 md:h-14 "
          alt="Amate Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-800 ">
          Citas
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={logoFull}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
      {
        navbarLinks.map((tab)=>(
          <Navbar.Link active={tab.active} className={`cursor-pointer text-base  ${tab.active ? 'font-bold' : 'text-rose-600 font-semibold'}`} key={tab.title} onClick={()=>onChangeTab(tab)}>
            {tab.title}
          </Navbar.Link>
        ))
      }
      </Navbar.Collapse>
    </Navbar>
  );
};
