
import { useState } from "react";

import API from "../../utils/api/api";

import "./ContactForm.scss";

export default function ContactForm() {
    const initialFormData = {
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setStatus("");

        // Vérifier les champs obligatoires
        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            setLoading(false);
            return;
        }

        try {
            await API.email.sendEmailContact(formData);

            setStatus("success");
            setFormData(initialFormData);

        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);

            setStatus("error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-form" id="contact-form">

            <div className="contact-form-container">

                <div className="contact-form-header">
                    <p>
                        Une question, une demande ou un projet ?
                        <br />
                        N'hésitez pas à nous contacter.
                    </p>
                </div>


                <form
                    className="contact-form-form"
                    onSubmit={handleSubmit}
                >

                    {/* NOM + SOCIÉTÉ */}
                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="name">
                                Nom *
                            </label>

                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                maxLength={50}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="company">
                                Société
                            </label>

                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                maxLength={50}
                            />
                        </div>

                    </div>


                    {/* EMAIL + TÉLÉPHONE */}
                    <div className="form-row">

                        <div className="form-group">
                            <label htmlFor="email">
                                Email *
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                maxLength={100}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="phone">
                                Téléphone
                            </label>

                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={30}
                            />
                        </div>

                    </div>


                    {/* MESSAGE */}
                    <div className="form-group">

                        <label htmlFor="message">
                            Message *
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="7"
                            maxLength={2000}
                            required
                        />

                        <div className="message-info">
                            <small>
                                2000 caractères maximum
                            </small>

                            <small className="message-counter">
                                {formData.message.length} / 2000
                            </small>
                        </div>

                    </div>


                    {/* BOUTON */}
                    <button
                        type="submit"
                        className="contact-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Envoi en cours..."
                            : "Envoyer"}
                    </button>


                    {/* MESSAGE DE SUCCÈS */}
                    {status === "success" && (
                        <p className="form-message success">
                            Votre message a bien été envoyé.
                            <br />
                            Un email de confirmation vient de vous être envoyé.
                        </p>
                    )}


                    {/* MESSAGE D'ERREUR */}
                    {status === "error" && (
                        <p className="form-message error">
                            Une erreur est survenue lors de l'envoi
                            de votre message. Veuillez réessayer.
                        </p>
                    )}

                </form>

            </div>

        </section>
    );
};
