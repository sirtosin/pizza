import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer__container">
      <section className="extra">
        <h2>need an extra slice?</h2>
        <img src="https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900" />
      </section>
      <section className="work__hours">
        <h1>work hours</h1>

        <h4>Monday - Saturday:</h4>
        <h4>09:00 am - 08:00pm</h4>
      </section>
      <section className="footer__contact">
        <h1> contact us </h1>
        <address>no 8, opebi road ikeja lagos</address>
        <h4>want to make a call to customer care, dial ( +234) 40680757</h4>
        <h4>
          send us an email to sirtosin45@gmail.com and we will respond
          accordingly.
        </h4>
      </section>
    </div>
  );
};

export default Footer;
