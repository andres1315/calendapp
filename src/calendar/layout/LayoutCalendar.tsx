import { NavbarCalendar } from "../../common/components/Navbar";


interface Props {
  children: React.ReactNode;
}

export const LayoutCalendar = ({ children }: Props) => {
  return (
    <>
      <NavbarCalendar />
      <section className="mx-1">{children}</section>
    </>
  );
};
