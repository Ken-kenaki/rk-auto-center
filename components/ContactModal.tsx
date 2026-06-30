"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowRight, MapPin, X, HelpCircle, MessageSquare } from "lucide-react";
import { useContact } from "@/context/ContactContext";
import { databases } from "@/lib/appwrite";
import { DB_ID, LEADS_COLLECTION_ID } from "@/lib/constants";
import { ID } from "appwrite";

export default function ContactModal() {
  const { isOpen, closeContactModal } = useContact();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Submit lead to Appwrite Database
      if (databases) {
        await databases.createDocument(
          DB_ID,
          LEADS_COLLECTION_ID,
          ID.unique(),
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            whatsapp: formData.whatsapp || null,
            subject: formData.subject,
            message: formData.message,
            status: "pending",
          }
        );
      }
      
      setSubmitted(true);

      // 2. Redirect to WhatsApp (using their number 9847699255)
      setTimeout(() => {
        const text = `Hello RK Auto Center, I would like to make an inquiry:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "N/A"}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
        window.open(
          `https://wa.me/9779847699255?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      }, 1000);
    } catch (err: any) {
      console.error("Error submitting lead to Appwrite:", err);
      // Fallback: still redirect to WhatsApp even if database is down
      setSubmitted(true);
      setTimeout(() => {
        const text = `Hello RK Auto Center, I would like to make an inquiry:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "N/A"}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
        window.open(
          `https://wa.me/9779847699255?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    closeContactModal();
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Main Container */}
          <motion.div
            layoutId="navbar-contact-card"
            style={{ borderRadius: "0px" }}
            layout
            className="relative flex h-full w-full overflow-hidden bg-neutral-950 transform-gpu will-change-transform z-50 text-white"
          >
            {/* Background elements */}
            <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
              {/* Dark Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, #171717 0%, #0a0a0a 70%, #020202 100%)",
                }}
              />
              {/* Car Background Image on top of gradient */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1600")`,
                  opacity: 0.08,
                  filter: "brightness(0.5) contrast(120%)",
                  mixBlendMode: "overlay",
                }}
              />
              <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-red-600/10 blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-red-800/10 blur-[120px]" />
            </div>

            {/* Content Scroller */}
            <div className="h-full w-full overflow-y-auto scrollbar-hide relative z-10">
              <div className="relative py-12 min-h-full flex flex-col lg:flex-row w-full max-w-7xl mx-auto items-start p-6 sm:p-10 lg:p-16 gap-12 lg:gap-16">
                {/* Left side: Location Map & Details */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 flex flex-col justify-center space-y-6 w-full text-left"
                >
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-red-600 mb-3"
                    >
                      Contact Us
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-none tracking-tight mb-4" style={{ fontFamily: "Hanken Grotesk" }}>
                      Let's Discuss Your Dream Drive
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                      Have questions about a vehicle, custom sourcing, or selling your car? Reach out to our automotive specialists or visit our showroom.
                    </p>
                  </div>

                  {/* Showroom Map */}
                  <div className="space-y-4 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-500" />
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Showroom Location</h4>
                    </div>

                    <div className="h-72 w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-850 pointer-events-auto relative z-20">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4310.001056425122!2d85.29446137608566!3d27.697614025919602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19593813c805%3A0x6ac6cf0aaeb8fbe5!2sR.K%20Auto%20Center!5e1!3m2!1sen!2snp!4v1782712536907!5m2!1sen!2snp"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      RK Auto Center — Kalimati, Kathmandu, Nepal (Opposite Kumari Bank)
                    </p>
                  </div>

                  {/* Contact Methods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                    <div className="flex items-center gap-3 bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Call Us</p>
                        <div className="flex flex-col text-xs font-bold text-neutral-200">
                          <a href="tel:9847699255" className="hover:text-red-500 transition-colors">9847699255</a>
                          <a href="tel:9802008796" className="hover:text-red-500 transition-colors">9802008796</a>
                          <a href="tel:9802008797" className="hover:text-red-500 transition-colors">9802008797</a>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/9779847699255"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800 shadow-sm hover:bg-neutral-850 hover:border-emerald-500/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974-1.86-1.865-4.343-2.891-6.986-2.893-5.44 0-9.865 4.42-9.869 9.86-.001 1.762.463 3.483 1.348 5.013l-.993 3.626 3.712-.975zm11.758-7.05c-.328-.164-1.94-.959-2.24-1.07-.3-.11-.52-.165-.74.164-.22.33-.85 1.07-1.04 1.28-.19.21-.38.235-.71.07-.33-.164-1.393-.513-2.653-1.637-.98-.874-1.64-1.953-1.83-2.282-.19-.328-.02-.505.144-.67.15-.147.33-.382.49-.574.16-.192.21-.328.31-.547.1-.218.05-.41-.02-.574-.07-.164-.74-1.785-1.01-2.44-.26-.63-.53-.54-.74-.55-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.122-1.15 2.736 0 1.614 1.17 3.178 1.33 3.397.16.215 2.3 3.51 5.58 4.93.78.337 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.94-.79 2.21-1.56.27-.77.27-1.43.19-1.56-.08-.13-.3-.21-.63-.374z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">WhatsApp</p>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Chat on WhatsApp</p>
                      </div>
                    </a>

                    <a
                      href="https://www.facebook.com/rkautocenter1/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800 shadow-sm hover:bg-neutral-850 hover:border-blue-500/20 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Facebook</p>
                        <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Facebook Page</p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-800 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Email Us</p>
                        <a
                          href="mailto:info@rkautomobiles.com"
                          className="text-xs font-bold text-white break-all block hover:text-red-500 transition-colors"
                        >
                          info@rkautomobiles.com
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right side: Glass Inquiry Form */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 w-full bg-neutral-900/60 backdrop-blur-3xl border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative"
                >
                  <AnimatePresence mode="wait">
                    {!submitted ? (
                      <form onSubmit={handleFormSubmit} className="space-y-5 text-left">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">Send Inquiry</h3>
                          <p className="text-xs text-neutral-400">
                            Provide your details and we will connect with you via Phone or WhatsApp shortly.
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all animate-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="98XXXXXXXX"
                              className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                              WhatsApp Number
                            </label>
                            <input
                              type="tel"
                              value={formData.whatsapp}
                              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                              placeholder="98XXXXXXXX"
                              className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                            Subject *
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all [&>option]:bg-neutral-900 [&>option]:text-white"
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Buy a Car">Buy a Car</option>
                            <option value="Sell my Car">Sell my Car</option>
                            <option value="Vehicle Sourcing">Vehicle Sourcing</option>
                            <option value="Trade-in Quote">Trade-in Quote</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">
                            Message *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="I'm interested in..."
                            className="w-full p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-red-500 focus:bg-neutral-900 text-sm transition-all resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-red-600 text-white font-extrabold hover:bg-red-700 hover:shadow-lg hover:shadow-red-900/20 active:scale-[0.98] transition-all text-sm disabled:opacity-50 cursor-pointer"
                        >
                          <span>{loading ? "Submitting..." : "Submit Inquiry"}</span>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-16 text-center space-y-6 text-white"
                      >
                        <div className="w-20 h-20 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                          <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.02-5.11-2.881-6.974-1.86-1.865-4.343-2.891-6.986-2.893-5.44 0-9.865 4.42-9.869 9.86-.001 1.762.463 3.483 1.348 5.013l-.993 3.626 3.712-.975zm11.758-7.05c-.328-.164-1.94-.959-2.24-1.07-.3-.11-.52-.165-.74.164-.22.33-.85 1.07-1.04 1.28-.19.21-.38.235-.71.07-.33-.164-1.393-.513-2.653-1.637-.98-.874-1.64-1.953-1.83-2.282-.19-.328-.02-.505.144-.67.15-.147.33-.382.49-.574.16-.192.21-.328.31-.547.1-.218.05-.41-.02-.574-.07-.164-.74-1.785-1.01-2.44-.26-.63-.53-.54-.74-.55-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.122-1.15 2.736 0 1.614 1.17 3.178 1.33 3.397.16.215 2.3 3.51 5.58 4.93.78.337 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.94-.79 2.21-1.56.27-.77.27-1.43.19-1.56-.08-.13-.3-.21-.63-.374z" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">Inquiry Sent!</h3>
                          <p className="text-sm text-neutral-400 max-w-xs mx-auto leading-relaxed">
                            We are opening WhatsApp now to connect you directly with one of our coordinators.
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 max-w-xs mx-auto">
                          <a
                            href={`https://wa.me/9779847699255?text=${encodeURIComponent(
                              `Hello RK Auto Center, I would like to make an inquiry:\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone || "N/A"}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 active:scale-95 transition-all text-sm shadow-xl inline-block"
                          >
                            Open WhatsApp Manually
                          </a>
                          <button
                            onClick={() => setSubmitted(false)}
                            className="text-xs text-neutral-500 hover:text-white underline transition-colors cursor-pointer"
                          >
                            Back to Form
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-6 z-[110] flex h-10 w-10 items-center justify-center text-white bg-neutral-800/80 hover:bg-neutral-700/80 transition-colors rounded-full cursor-pointer shadow-sm border border-neutral-750"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
