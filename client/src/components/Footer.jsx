import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer-top">
                <div>
                    <h3>Get to Know Us</h3>
                    <p>About Us</p>
                    <p>Careers</p>
                    <p>Press Releases</p>
                    <p>Amazon Science</p>
                </div>

                <div>
                    <h3>Make Money with Us</h3>
                    <p onClick={() => window.location.href = "/?sell=true"}>
                      Sell on Amazon
                    </p>
                    <p>Sell under Amazon Accelerator</p>
                    <p>Protect and Build Your Brand</p>
                    <p>Become an Affiliate</p>
                </div>

                <div>
                    <h3>Amazon Payment Products</h3>
                    <p>Amazon Business Card</p>
                    <p>Shop with Points</p>
                    <p>Reload Your Balance</p>
                    <p>Amazon Currency Converter</p>
                </div>

                <div>
                    <h3>Let Us Help You</h3>
                    <p onClick={() => window.location.href = "/profile"}>
                       Your Account
                    </p>
                   <p onClick={() => window.location.href = "/orders"}>
                       Your Orders
                  </p>
                    <p>Shipping Rates</p>
                    <p onClick={() => window.location.href = "/orders"}>
                      Returns & Replacements
                   </p>
                    <p onClick={() => window.location.href = "/customer-service"}>
                          Help
                    </p>
                </div>
            </div>

            <div className="footer-middle">
                <div className="footer-logo"></div>
            </div>

            <div className="footer-bottom">
                <p>Conditions of Use</p>
                <p>Privacy Notice</p>
                <p>Your Ads Privacy Choices</p>
                <p>© 2026 Amazon Clone</p>
            </div>
   <button
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
   >
        ↑ Back to top
   </button>
        </footer>
    );
};

export default Footer;