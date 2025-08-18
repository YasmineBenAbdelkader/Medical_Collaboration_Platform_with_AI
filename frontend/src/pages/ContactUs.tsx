import { useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

export const ContactUs = () => {
  const isTeal = true;
  const [form, setForm] = useState({
    name: '',
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
    // For now, just log. Hook up to backend or email service later.
    console.log('Contact form submitted:', form);
    alert('Merci! Votre message a été envoyé.');
    setForm({ name: '', email: '', phone: '', date: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isTeal={isTeal} logoSrc="/vite.svg" brandTitle="MedCollab" brandSubtitle="Collaboration médicale" />
      <div className="py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Contactez-nous</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Votre nom" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="vous@email.com" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="+33 ..." />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input name="subject" value={form.subject} onChange={handleChange} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Sujet" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Votre message" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="inline-flex items-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Envoyer
            </button>
          </div>
        </form>
      </div>
      </div>
      <Footer appName="MedCollab" description="Plateforme de collaboration médicale et d'assistance IA pour partager des cas cliniques et améliorer les décisions." />
    </div>
  );
};


