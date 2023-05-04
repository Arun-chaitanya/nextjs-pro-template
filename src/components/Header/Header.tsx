import useTranslation from "next-translate/useTranslation";
import { Container, Row, Col } from "react-grid-system";

import { } from "@config/urls";
import useBreakpoint from "@hooks/useBreakpoint";

import Logo from "@components/Logo";
import NavItem from "@components/NavItem";
import NavList from "@components/NavList";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const { t } = useTranslation("header");

  const isTab = useBreakpoint({ max: "md" });
  
  const tabs = [
    { href: "", text: t("mobile-activities") },
    { href: "", text: t("mobile-itineraries") },
    { href: "", text: t("mobile-my-bookings") },
    { href: "", text: t("mobile-profile") },
  ];

  const renderLinks = () => (
    <>
      {tabs.map((item) => {
        return (
          <NavItem key={item.href} className={isTab ? "" : "pl10 pr10"} href={item.href} exact>
            {item.text}
          </NavItem>
        );
      })}
    </>
  );

  return (
    <header className={styles.root} data-testid="header">
      <Container>
        <Row align="center" nogutter justify="between">
          <Col xs={8} sm={8} md={4.5} lg={4}>
            <Logo href={""} />
          </Col>
          <Col xs={4} sm={4} md={7.5} lg={8}>
            <NavList>{renderLinks()}</NavList>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
