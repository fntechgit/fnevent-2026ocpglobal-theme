import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import DefaultContentPageTemplate from "@openeventkit/event-site/src/templates/content-page/template";
import shortcodes from "@openeventkit/event-site/src/templates/content-page/shortcodes";
import styles from "./faq.module.scss";

const topics = [
  ["signing-in", "Signing in"],
  ["registration-orders-and-tickets", "Registration & tickets"],
  ["using-the-fnattendee-app", "FNattendee app"],
  ["schedule-and-sessions", "Schedule & sessions"],
  ["profile-privacy-and-networking", "Profile & networking"],
  ["troubleshooting-and-support", "Troubleshooting & support"],
  ["new-see-the-app-in-action", "App demo"],
];

const onsiteTopics = [
  ["at-a-glance", "At a glance"],
  ["before-you-go", "Before you go"],
  ["badge-pickup", "Badge pickup"],
  ["keynotes", "Keynotes"],
  ["getting-around", "Getting around"],
  ["during-the-summit", "During the Summit"],
  ["after-the-summit", "After the Summit"],
];

const headingText = (children) => React.Children.toArray(children)
  .map((child) => React.isValidElement(child) ? headingText(child.props.children) : String(child))
  .join("");

const TopicHeading = ({ children, ...props }) => (
  <h2 {...props} id={headingText(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} tabIndex={-1}>
    {children}
  </h2>
);

const TopicNav = ({ label, eyebrow, topics }) => (
  <nav aria-label={label}>
    <p className={styles.eyebrow}>{eyebrow}</p>
    <ul>
      {topics.map(([id, text], index) => (
        <li key={id}>
          <a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{text}</a>
        </li>
      ))}
    </ul>
  </nav>
);

const OnsiteInfoPage = ({ content }) => (
  <div className={styles.faq}>
    <header className={`${styles.hero} ${styles.heroSimple}`}>
      <div>
        <p className={styles.eyebrow}>2026 OCP Global Summit · San Jose · Oct. 12–15</p>
        <h1>Onsite info</h1>
        <p className={styles.intro}>Badge pickup, keynotes, shuttles and everything else you need for the week.</p>
      </div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <TopicNav label="Onsite info sections" eyebrow="On this page" topics={onsiteTopics} />
        <div className={styles.sidebarHelp}>
          <p>Questions?</p>
          <a href="mailto:registration@opencompute.org?subject=2026%20OCP%20Global%20Summit%20onsite%20question">registration@opencompute.org</a>
        </div>
      </aside>

      <article className={styles.answers} aria-label="Onsite information">
        <MDXProvider components={{ ...shortcodes, h2: TopicHeading }}>
          {content}
        </MDXProvider>
        <p className={styles.mobileHelp}>
          Questions? Email <a href="mailto:registration@opencompute.org?subject=2026%20OCP%20Global%20Summit%20onsite%20question">registration@opencompute.org</a>
        </p>
      </article>
    </div>
  </div>
);

// Keep the body in CMS/native-compatible Markdown; presentation belongs to the web theme.
const ContentPageTemplate = ({ title, content }) => {
  if (title === "Onsite Info") {
    return <OnsiteInfoPage content={content} />;
  }

  if (title !== "FAQ") {
    return <DefaultContentPageTemplate title={title} content={content} />;
  }

  return (
    <div className={styles.faq}>
      <header className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>2026 OCP Global Summit · Attendee help</p>
          <h1>Frequently asked questions</h1>
          <p className={styles.intro}>A little help for every part of your Summit experience.</p>
          <a className={styles.primaryLink} href="/a/my-tickets">Find or manage your tickets <span aria-hidden="true">↗</span></a>
        </div>
        <aside className={styles.appCard} aria-labelledby="faq-app-title">
          <p className={styles.eyebrow}>Your Summit, in your pocket</p>
          <h2 id="faq-app-title">Meet FNattendee</h2>
          <p>Your schedule, tickets and connections, all in one place.</p>
          <div className={styles.storeLinks}>
            <a href="https://apps.apple.com/gb/app/fnattendee/id6794956430">Apple App Store <span aria-hidden="true">↗</span></a>
            <a href="https://play.google.com/store/apps/details?id=com.fntech.ftnattendee">Google Play <span aria-hidden="true">↗</span></a>
          </div>
          <a className={styles.demoLink} href="https://www.youtube.com/shorts/EhSbYk1dsBY">Watch the app demo <span aria-hidden="true">→</span></a>
        </aside>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <TopicNav label="FAQ topics" eyebrow="Find your answer" topics={topics} />
          <div className={styles.sidebarHelp}>
            <p>Still need a hand?</p>
            <a href="#faq-contact">Contact the right team <span aria-hidden="true">↓</span></a>
          </div>
        </aside>

        <article className={styles.answers} aria-label="Frequently asked questions and answers">
          <MDXProvider components={{ ...shortcodes, h2: TopicHeading }}>
            {content}
          </MDXProvider>
        </article>
      </div>

      <section className={styles.support} id="faq-contact" aria-labelledby="faq-contact-title" tabIndex={-1}>
        <p className={styles.eyebrow}>People who can help</p>
        <h2 id="faq-contact-title">Still have a question?</h2>
        <div className={styles.supportGrid}>
          <div>
            <h3>Registration & tickets</h3>
            <p>Orders, ticket assignments, registration details or badge collection.</p>
            <a href="mailto:registration@opencompute.org?subject=2026%20OCP%20Global%20Summit%20registration%20question">registration@opencompute.org</a>
          </div>
          <div>
            <h3>App & sign-in support</h3>
            <p>Your FNid, the event website, or something that isn’t working in the app.</p>
            <a href="mailto:support@fntech.com?subject=2026%20OCP%20Global%20Summit%20technical%20support">support@fntech.com</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentPageTemplate;
