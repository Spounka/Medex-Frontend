import BreadCrumb from "../../components/Buyer/shared/BreadCrumb";

import { AiOutlineSend } from "react-icons/ai";
import { BsTelephone, BsEnvelopeAt, BsInfoCircle } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";

import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Contact = () => {
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/contact/",
                {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    message: e.target.message.value,
                },
                {
                    "Content-type": "application/json",
                }
            )
            .then(() => {
                toast.success(`${t("buyer_pages.contact_us.success")}!`);
            })
            .catch(() => {
                toast.error(`${t("buyer_pages.contact_us.error")}!`);
            });
    };

    return (
        <main>
            <section className="py-4">
                <div className="container">
                    <div className="row mb-3">
                        <BreadCrumb title={`${t("contact_us")}`} />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.217280603387!2d46.68222777666308!3d24.66250029635196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f04a51406d117%3A0xb38dd4ac1c43f0ff!2sAldara%20Hospital!5e1!3m2!1sen!2sde!4v1696318936085!5m2!1sen!2sde"
                                width="600"
                                height="450"
                                className="shadow border-0 w-100 rounded"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-12 col-md-6">
                            <h3 className="contact__title">Contact Us</h3>
                            <div className="flex flex-column justify-content-center align-items-center mt-5">
                                <form method="post" onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="floatingNameInput"
                                            required
                                            placeholder={`${t("full_name")}...`}
                                        />
                                        <label
                                            htmlFor="floatingNameInput"
                                            className="contact__form-label"
                                        >
                                            {t("full_name")}
                                        </label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingEmailInput"
                                            name="email"
                                            required
                                            placeholder={`${t("email")}...`}
                                        />
                                        <label
                                            htmlFor="floatingEmailInput"
                                            className="contact__form-label"
                                        >
                                            {t("email")}
                                        </label>
                                    </div>

                                    <div className="form-floating">
                                        <textarea
                                            className="form-control"
                                            placeholder={`${t(
                                                "buyer_pages.buyer_pages.message"
                                            )}...`}
                                            id="floatingCommentTextarea"
                                            name="message"
                                            required
                                            style={{ height: "150px" }}
                                        ></textarea>
                                        <label
                                            htmlFor="floatingCommentTextarea"
                                            className="contact__form-label"
                                        >
                                            {t(
                                                "buyer_pages.contact_us.message"
                                            )}
                                        </label>
                                    </div>
                                    <div className="row mt-2">
                                        <button className="gradient-bg-color px-3 py-2 text-white rounded shadow mt-3 fw-bold contact__form-submit d-flex gap-2 align-items-center justify-content-center shadow">
                                            {t("buyer_pages.contact_us.submit")}

                                            <AiOutlineSend size="1.5rem" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 px-md-5 mt-5 mt-md-0">
                            <h3 className="contact__title">
                                {t("buyer_pages.contact_us.touch")}
                            </h3>
                            <div
                                className="mt-5 d-flex flex-column align-items-start justify-content-between"
                                style={{ height: "200px" }}
                            >
                                <address className="m-0 d-flex align-items-center gap-3">
                                    <FiMapPin size="1.6rem" />
                                    {t("footer.company_address")}. <br />
                                    {t("footer.company_city_country")}
                                </address>
                                <a
                                    href="tel:+966 072222297"
                                    className="d-flex align-items-center gap-3 text-dark"
                                >
                                    <BsTelephone size="1.6rem" />
                                    +966 07 2222297
                                </a>
                                <a
                                    href="mailto:test@test.com"
                                    className="d-flex align-items-center gap-3 text-dark"
                                >
                                    <BsEnvelopeAt size="1.6rem" />
                                    test@test.com
                                </a>
                                <p className="m-0 d-flex align-items-center gap-3 text-dark">
                                    <BsInfoCircle size="1.6rem" />
                                    {t("buyer_pages.contact_us.times")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
