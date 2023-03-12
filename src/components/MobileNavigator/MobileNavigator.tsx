import useTranslation from "next-translate/useTranslation";
import { Col, Container, Row } from "react-grid-system";

import { } from "@config/urls";

import Calender from "@icons/Tabs/Calender";
import Document from "@icons/Tabs/Document";
import Home from "@icons/Tabs/Home";
import Profile from "@icons/Tabs/Profile";

import styles from "./MobileNavigator.module.scss";
import MobileTab from "./MobileTab";

const MobileNavigator: React.FC = () => {
  const { t } = useTranslation("header");

  const tabs = [
    { href: "", Icon: Home, text: t("mobile-activities") },
    { href: "", Icon: Document, text: t("mobile-itineraries") },
    { href: "", Icon: Calender, text: t("mobile-my-bookings") },
    { href: "", Icon: Profile, text: t("mobile-profile") },
  ];

  return (
    <>
      <div className="p-45" />
      <div className={styles.root} data-testid="mobile-navigator">
        <Container>
          <Row>
            {tabs.map((tab) => (
              <Col xs={3} key={tab.text} style={{ padding: 0 }}>
                <MobileTab {...tab} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MobileNavigator;
