import { useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

export const ContactUs = () => {
  const isTeal = true;
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
    alert('✅ Merci! Votre message a été envoyé.');
    setForm({ firstName: '', lastName: '', email: '', phone: '', date: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar
        isTeal={isTeal}
        logoSrc="/vite.svg"
        brandTitle="MedCollab"
        brandSubtitle="Collaboration médicale"
      />

      {/* Form */}
      <div className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-10">
          
          {/* Titre et description */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Contactez-nous</h1>
            <p className="mt-2 text-lg text-gray-600">Nous sommes là pour vous aider</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="Votre nom"
              />
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="Votre prénom"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="vous@email.com"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="+216 ........................................................................................"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
              />
            </div>

            {/* Sujet */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm 
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="Sujet"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900 
                           placeholder-gray-400 shadow-sm resize-none
                           focus:outline-none focus:border-[#00A7A7] focus:ring-2 focus:ring-[#00A7A7] 
                           transition duration-200"
                placeholder="Votre message..."
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-3 rounded-xl bg-[#00A7A7] text-white font-semibold 
                           shadow-md hover:bg-teal-700 transition-colors duration-200 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A7A7]"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer
        appName="MedCollab"
        description="Plateforme de collaboration médicale et d'assistance IA pour partager des cas cliniques et améliorer les décisions."
      />
    </div>
  );
};
