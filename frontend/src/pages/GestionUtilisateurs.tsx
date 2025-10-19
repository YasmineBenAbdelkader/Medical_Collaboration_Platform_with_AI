import React, { useState } from 'react';
import { Search, UserCheck, UserX, Trash2, Shield } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'medecin' | 'expert';
  specialty?: string;
  status: 'active' | 'suspended' | 'pending';
  avatar: string;
  joinedAt: string;
}

export const GestionUtilisateurs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'medecin' | 'expert'>('all');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Dr. Sophie Martin',
      email: 'sophie.martin@hospital.fr',
      role: 'medecin',
      specialty: 'Cardiologie',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
      joinedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Dr. Jean Dubois',
      email: 'jean.dubois@expert.fr',
      role: 'expert',
      specialty: 'Cardiologie',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
      joinedAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Dr. Alice Dupont',
      email: 'alice.dupont@hospital.fr',
      role: 'medecin',
      specialty: 'Cardiologie',
      status: 'pending',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      joinedAt: '2024-03-01'
    },
    {
      id: '4',
      name: 'Dr. Marc Leroy',
      email: 'marc.leroy@expert.fr',
      role: 'expert',
      specialty: 'Cardiologie',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a7',
      joinedAt: '2024-01-30'
    },
    {
      id: '5',
      name: 'Dr. Claire Fournier',
      email: 'claire.fournier@hospital.fr',
      role: 'medecin',
      specialty: 'Cardiologie',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
      joinedAt: '2024-02-12'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const config = {
      medecin: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Médecin' },
      expert: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Expert' }
    };
    const c = config[role as keyof typeof config];
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <span className="flex items-center gap-1 text-xs text-green-600">
          <UserCheck size={14} /> Actif
        </span>
      );
    } else if (status === 'suspended') {
      return (
        <span className="flex items-center gap-1 text-xs text-red-600">
          <UserX size={14} /> Suspendu
        </span>
      );
    } else {
      return (
        <span className="flex items-center gap-1 text-xs text-yellow-600">
          <UserX size={14} /> En attente
        </span>
      );
    }
  };

  const handleExamine = (id: string) => {
    alert(`Examiner l'inscription de l'utilisateur ${id}`);
    // Ici tu peux ouvrir un modal ou effectuer une action d'acceptation/refus
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des utilisateurs</h1>

      {/* Filtres */}
      <div className="bg-white rounded-xl border p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A7A7] focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {['all', 'medecin', 'expert'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  roleFilter === role
                    ? 'bg-[#00A7A7] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {role === 'all' ? 'Tous' : role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table utilisateurs */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spécialité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inscrit le</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.specialty || '—'}</td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.joinedAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === 'pending' ? (
                        <button
                          className="p-2 rounded-lg bg-teal-50 text-teal-600 hover:bg-teal-100 transition"
                          onClick={() => handleExamine(user.id)}
                        >
                          Examiner
                        </button>
                      ) : (
                        <>
                          <button className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition" title="Permissions">
                            <Shield size={16} />
                          </button>
                          <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition" title="Supprimer">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun utilisateur trouvé</p>
        </div>
      )}
    </div>
  );
};
