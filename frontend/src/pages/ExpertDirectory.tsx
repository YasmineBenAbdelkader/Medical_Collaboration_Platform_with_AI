import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Award,
  MapPin,
  Star,
  MessageCircle,
  Building,
} from "lucide-react";

export const ExpertDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const experts = [
    {
      id: "1",
      name: "Dr. Sophie Martin",
      specialty: "Cardiologie",
      expertise: ["Cardiologie structurelle", "Valvulopathies"],
      location: "Lyon, France",
      hospital: "Hôpital Louis Pradel",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      reviewCount: 124,
      isOnline: true,
      verified: true,
    },
    {
      id: "2",
      name: "Dr. Jean Dubois",
      specialty: "Neurologie",
      expertise: ["Neurodégénératives", "Épilepsie"],
      location: "Paris, France",
      hospital: "Pitié-Salpêtrière",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      reviewCount: 98,
      isOnline: false,
      verified: true,
    },
  ];

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || (activeFilter === "available" && expert.isOnline);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-3">
          Annuaire des{" "}
          <span className="font-semibold text-[#00A7A7]">experts</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Trouvez et contactez des experts médicaux qualifiés rapidement et
          facilement.
        </p>
      </div>

      {/* Recherche + filtres */}
      <div className="flex flex-col md:flex-row md:items-center mb-10 space-y-4 md:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou spécialité..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#00A7A7] text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0 md:ml-6">
          {[
            { key: "all", label: "Tous" },
            { key: "available", label: "Disponibles" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-1 text-sm rounded-full transition font-medium ${
                activeFilter === filter.key
                  ? "bg-[#00A7A7]/10 text-[#00A7A7]"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Experts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between"
          >
            {/* Top */}
            <div className="flex items-start mb-5">
              <div className="relative">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-100"
                />
                {expert.isOnline && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border border-white rounded-full"></span>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center space-x-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {expert.name}
                  </h3>
                  {expert.verified && <Award size={16} className="text-[#ffc300]" />}
                </div>
                <p className="text-sm text-[#00A7A7] mt-1">{expert.specialty}</p>
              </div>
            </div>

            {/* Expertise */}
            <div className="flex flex-wrap gap-2 mb-4">
              {expert.expertise.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-full bg-[#00A7A7]/10 text-[#00A7A7] border border-[#00A7A7]"
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Infos */}
            <div className="text-gray-500 text-sm space-y-2 mb-5">
              <div className="flex items-center space-x-2">
                <Building size={14} className="text-gray-400" />
                <span>{expert.hospital}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={14} className="text-gray-400" />
                <span>{expert.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={14} className="text-yellow-400" />
                <span className="font-medium text-[#00A7A7]">
                  {expert.reviewCount} pubs répondues
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Link
                to={`/profile/${expert.id}`}
                className="flex-1 text-center px-3 py-2 text-sm rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                Voir profil
              </Link>
              <Link
                to={`/contact/${expert.id}`}
                className="flex-1 flex items-center justify-center px-3 py-2 text-sm rounded-lg text-white bg-[#00A7A7] hover:bg-[#008b8b] transition"
              >
                <MessageCircle size={16} className="mr-1" />
                Contacter
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredExperts.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Search size={24} className="mx-auto mb-2" />
          <p>Aucun expert trouvé</p>
          <p className="text-sm">Essayez d’ajuster vos critères.</p>
        </div>
      )}
    </div>
  );
};
