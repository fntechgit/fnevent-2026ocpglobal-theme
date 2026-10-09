import * as React from "react";
import { getSrc } from "gatsby-plugin-image";
import AuthComponent from "@openeventkit/event-site/src/components/AuthComponent";
import RegistrationModalComponent from "@openeventkit/event-site/src/components/RegistrationModalComponent";
import RegisterButton from "@openeventkit/event-site/src/components/RegisterButton";
import { REGISTRATION_MODE } from "@utils/registrationConstants";
import useSiteSettings from "@utils/useSiteSettings";

import styles from "./sold-out.module.scss";

// Keep the platform's configured registration flow, including promo redemption.
const ButtonGroup = ({ location, registerButton, loginButton }) => {
  const siteSettings = useSiteSettings();
  const mode = siteSettings?.registration?.registrationMode || REGISTRATION_MODE.modal;
  const redeemButton = (
    <button type="button" className={styles.redeemButton}>
      {registerButton?.text || "Redeem Now"}
      <span aria-hidden="true">→</span>
    </button>
  );

  return (
    <div className={styles.heroButtons}>
      {registerButton?.display && (mode === REGISTRATION_MODE.standalone || mode === REGISTRATION_MODE.link) && (
        <RegisterButton>{redeemButton}</RegisterButton>
      )}
      {registerButton?.display && mode === REGISTRATION_MODE.modal && (
        <RegistrationModalComponent location={location}>
          {redeemButton}
        </RegistrationModalComponent>
      )}
      {loginButton?.display && (
        <AuthComponent
          location={location}
          renderLoginButton={(onClick) => (
            <button type="button" className={styles.accountButton} onClick={onClick}>
              {loginButton.text || "Log In"}
              <span aria-hidden="true">→</span>
            </button>
          )}
          renderEnterButton={(onClick) => (
            <button type="button" className={styles.accountButton} onClick={onClick}>
              Enter <span aria-hidden="true">→</span>
            </button>
          )}
        />
      )}
    </div>
  );
};

// Theme shadow of event-site 2.1.66's MarketingHero/MainColumn.
const MainColumn = ({ location, title, subTitle, date, time, buttons, backgroundSrc, fullWidth }) => {
  const backgroundImageStyle = backgroundSrc
    ? { backgroundImage: `url(${getSrc(backgroundSrc)})` }
    : {};

  return (
    <div data-sold-out-hero="true" className={`column ${!fullWidth ? "is-half" : ""} p-0 ${styles.mainColumn}`} style={backgroundImageStyle}>
      <div className={styles.heroBody}>
        {title && <h1 className={styles.eventTitle}>{title}</h1>}
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        {date && <p className={styles.date}>{date} · San Jose</p>}
        {time && <p className={styles.time}>{time}</p>}

        <p className={styles.eyebrow}>Thank you, OCP Community!</p>
        <h2 className={styles.announcementTitle}>Sold out. Registration is closed.</h2>
        <p className={styles.intro}>
          The 2026 OCP Global Summit is sold out and registration is now closed.{" "}
          <strong>Onsite registration will not be offered, and OCP does not plan to reopen registration.</strong>{" "}
          If you do not have a ticket at this point, you should assume you will not be able to attend.
        </p>
        <p className={styles.note}>
          OCP posted notice that the Summit would sell out on May 4. As a non-profit Foundation, OCP is
          committed to being fair to everyone in the Community and will not be making individual exceptions.
        </p>
        <p className={styles.note}>
          All Summit sessions will be recorded. The video and slides from all sessions will be posted to the
          OCP website in the days following the show.
        </p>
        <a
          className={styles.notificationButton}
          href="https://mailchi.mp/opencompute/subscribe-to-ocp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join the OCP Mailing List <span aria-hidden="true">→</span>
        </a>

        <aside className={styles.reserved} aria-labelledby="reserved-registration-heading">
          <h3 id="reserved-registration-heading">Speakers &amp; existing promo-code holders</h3>
          <p>Your spot is reserved. Please redeem your code below.</p>
          <ButtonGroup {...buttons} location={location} />
        </aside>
      </div>
    </div>
  );
};

export default MainColumn;
