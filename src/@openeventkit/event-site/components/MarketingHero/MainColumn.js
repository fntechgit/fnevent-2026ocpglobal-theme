import * as React from "react";
import { getSrc } from "gatsby-plugin-image";
import AuthComponent from "@openeventkit/event-site/src/components/AuthComponent";
import RegistrationModalComponent from "@openeventkit/event-site/src/components/RegistrationModalComponent";
import RegisterButton from "@openeventkit/event-site/src/components/RegisterButton";
import { REGISTRATION_MODE } from "@utils/registrationConstants";
import useSiteSettings from "@utils/useSiteSettings";

import styles from "./hero.module.scss";

// Keep the platform's configured registration flow.
const ButtonGroup = ({ location, registerButton, loginButton }) => {
  const siteSettings = useSiteSettings();
  const mode = siteSettings?.registration?.registrationMode || REGISTRATION_MODE.modal;
  const registrationButton = (
    <button type="button" className={styles.registerButton}>
      {registerButton?.text || "Register Now"}
      <span aria-hidden="true">→</span>
    </button>
  );

  return (
    <div className={styles.heroButtons}>
      {registerButton?.display && (mode === REGISTRATION_MODE.standalone || mode === REGISTRATION_MODE.link) && (
        <RegisterButton>{registrationButton}</RegisterButton>
      )}
      {registerButton?.display && mode === REGISTRATION_MODE.modal && (
        <RegistrationModalComponent location={location}>
          {registrationButton}
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
    <div data-ocp-hero="true" className={`column ${!fullWidth ? "is-half" : ""} p-0 ${styles.mainColumn}`} style={backgroundImageStyle}>
      <div className={styles.heroBody}>
        {title && <h1 className={styles.eventTitle}>{title}</h1>}
        {subTitle && <p className={styles.subTitle}>{subTitle}</p>}
        {date && <p className={styles.date}>{date} · San Jose</p>}
        {time && <p className={styles.time}>{time}</p>}

        <p className={styles.eyebrow}>Limited tickets available</p>
        <h2 className={styles.announcementTitle}>Registration has reopened.</h2>
        <p className={styles.intro}>
          We have reopened registration for a limited number of tickets. Tickets are available on a{" "}
          <strong>first-come, first-served basis</strong> through the registration link below.
        </p>
        <ButtonGroup {...buttons} location={location} />

        <aside className={styles.reserved} aria-labelledby="before-you-register-heading">
          <h3 id="before-you-register-heading">Please note before you register</h3>
          <ul>
            <li>
              Clicking the link above does not guarantee a ticket. The Notification List far exceeds
              the number of tickets available, and we expect them to go quickly.
            </li>
            <li>Once the remaining tickets are claimed, registration will close again.</li>
            <li>
              <strong className={styles.deadline}>There will be no onsite registration.</strong> If you do
              not have a confirmed registration before the event, you will not be able to purchase a
              ticket at the San Jose Convention Center.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default MainColumn;
