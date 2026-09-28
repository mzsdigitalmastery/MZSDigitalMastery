import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Clock,
  RefreshCw,
  FolderPlus,
  HelpCircle,
  Database,
  Search,
  Filter,
  Layers,
  Eye,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  getResources,
  createResource,
  updateResource,
  deleteResource,
  getResourceRequests,
  updateRequestStatus,
  seedResourcesIfEmpty
} from '../firebase/firestore';
import { Resource, ResourceRequest, ResourceCategory, ResourceType, SkillLevel, ResourceStatus } from '../types';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface AdminPageProps {
  onNavigate: (path: string) => void;
  onRefreshGlobalResources: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate, onRefreshGlobalResources }) => {
  const { currentUser, isAdmin, isDemoAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'resources' | 'requests'>('resources');

  const [resources, setResources] = useState<Resource[]>([]);
  const [requests, setRequests] = useState<ResourceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Edit/Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Form Fields
  const [form, setForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    longDescription: '',
    thumbnail: '',
    category: 'Courses & Learning' as ResourceCategory,
    subcategory: '',
    resourceType: 'Course' as ResourceType,
    tagsString: '',
    language: 'English',
    skillLevel: 'All Levels' as SkillLevel,
    format: 'Web App',
    fileSize: '',
    platform: 'Web',
    externalUrl: '',
    accessType: 'Free' as any,
    isFree: true,
    isPremium: false,
    isFeatured: false,
    status: 'published' as ResourceStatus,
    author: '',
    publisher: '',
    license: 'MIT',
    usageNotes: '',
    price: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [resList, reqList] = await Promise.all([
        getResources(true),
        getResourceRequests()
      ]);
      setResources(resList);
      setRequests(reqList);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingResource(null);
    setForm({
      title: '',
      slug: '',
      shortDescription: '',
      longDescription: '',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      category: 'Courses & Learning',
      subcategory: 'General',
      resourceType: 'Course',
      tagsString: 'learning, tutorial',
      language: 'English',
      skillLevel: 'All Levels',
      format: 'Web',
      fileSize: '',
      platform: 'Cross-platform',
      externalUrl: 'https://',
      accessType: 'Free',
      isFree: true,
      isPremium: false,
      isFeatured: false,
      status: 'published',
      author: 'MZS Editorial Team',
      publisher: 'MZS Digital Mastery',
      license: 'MIT',
      usageNotes: 'Verified for general educational use.',
      price: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (res: Resource) => {
    setEditingResource(res);
    setForm({
      title: res.title,
      slug: res.slug,
      shortDescription: res.shortDescription,
      longDescription: res.longDescription,
      thumbnail: res.thumbnail,
      category: res.category,
      subcategory: res.subcategory,
      resourceType: res.resourceType,
      tagsString: res.tags.join(', '),
      language: res.language,
      skillLevel: res.skillLevel,
      format: res.format,
      fileSize: res.fileSize || '',
      platform: res.platform,
      externalUrl: res.externalUrl,
      accessType: res.accessType,
      isFree: res.isFree,
      isPremium: res.isPremium,
      isFeatured: res.isFeatured,
      status: res.status,
      author: res.author,
      publisher: res.publisher || '',
      license: res.license || '',
      usageNotes: res.usageNotes || '',
      price: res.price || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.shortDescription.trim()) {
      showFeedback('error', 'Title and description are required.');
      return;
    }

    setActionLoading(true);
    const tags = form.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const generatedSlug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const resourcePayload: Omit<Resource, 'id'> = {
      title: form.title.trim(),
      slug: generatedSlug,
      shortDescription: form.shortDescription.trim(),
      longDescription: form.longDescription.trim() || form.shortDescription.trim(),
      thumbnail: form.thumbnail.trim(),
      category: form.category,
      subcategory: form.subcategory.trim() || 'General',
      resourceType: form.resourceType,
      tags: tags.length ? tags : ['ecosystem'],
      language: form.language,
      skillLevel: form.skillLevel,
      format: form.format,
      fileSize: form.fileSize,
      platform: form.platform,
      externalUrl: form.externalUrl.trim(),
      accessType: form.accessType,
      isFree: form.isFree,
      isPremium: form.isPremium,
      isFeatured: form.isFeatured,
      status: form.status,
      author: form.author.trim() || 'MZS Digital Mastery',
      publisher: form.publisher.trim(),
      license: form.license.trim(),
      usageNotes: form.usageNotes.trim(),
      price: form.price.trim(),
      createdAt: editingResource?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (editingResource) {
        await updateResource(editingResource.id, resourcePayload);
        showFeedback('success', `Updated "${form.title}" successfully.`);
      } else {
        await createResource(resourcePayload);
        showFeedback('success', `Published new resource "${form.title}" to Firestore.`);
      }
      setIsModalOpen(false);
      await loadData();
      onRefreshGlobalResources();
    } catch (err: any) {
      console.error('Error saving resource:', err);
      showFeedback('error', err?.message || 'Failed to save resource to Firestore.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteResource = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteResource(id);
      showFeedback('success', `Resource "${title}" deleted.`);
      await loadData();
      onRefreshGlobalResources();
    } catch (err: any) {
      showFeedback('error', 'Failed to delete resource.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: any) => {
    try {
      await updateRequestStatus(id, status);
      showFeedback('success', `Request status updated to ${status}.`);
      await loadData();
    } catch {
      showFeedback('error', 'Failed to update request status.');
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm('Seed Firestore with curated reference resources?')) return;
    setActionLoading(true);
    try {
      const count = await seedResourcesIfEmpty();
      showFeedback('success', `Seeded ${count} reference resources to Firestore.`);
      await loadData();
      onRefreshGlobalResources();
    } catch (err: any) {
      showFeedback('error', 'Database seeding encountered an issue.');
    } finally {
      setActionLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-lg">
        <ShieldAlert className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-[#07152E] mb-2">Admin Portal Restricted</h2>
        <p className="text-xs text-slate-500 mb-6">
          You must be authenticated as an administrator or use one-click evaluation access.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-[#1769FF] text-white text-xs font-bold rounded-xl"
        >
          Return to Ecosystem
        </button>
      </div>
    );
  }

  // Metrics
  const totalRes = resources.length;
  const publishedRes = resources.filter((r) => r.status === 'published').length;
  const draftRes = resources.filter((r) => r.status === 'draft').length;
  const featuredRes = resources.filter((r) => r.isFeatured).length;
  const pendingRequests = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: 'Ecosystem', path: '/' }, { label: 'Admin Command Center' }]}
        onNavigate={onNavigate}
      />

      {/* Header bar */}
      <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-[#07152E] text-[#16D9FF] px-2.5 py-0.5 rounded-full border border-slate-700">
              {isDemoAdmin ? 'Admin Evaluator Session' : 'Firestore Production Admin'}
            </span>
            <span className="text-xs text-slate-400">
              {currentUser?.email || 'mzsdigitalmastery@gmail.com'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#07152E] tracking-tight">
            MZS Ecosystem Administration
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSeedDatabase}
            disabled={actionLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-[#1769FF]" />
            <span>Seed Firestore</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1769FF] hover:bg-[#1254cc] text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Resource</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-6 p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <span>{feedback.message}</span>
          <button onClick={() => setFeedback(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 mb-8">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Assets
          </span>
          <span className="text-2xl font-extrabold text-[#07152E]">{totalRes}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
            Published
          </span>
          <span className="text-2xl font-extrabold text-emerald-700">{publishedRes}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Drafts
          </span>
          <span className="text-2xl font-extrabold text-amber-700">{draftRes}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-[#1769FF] uppercase tracking-wider block">
            Featured
          </span>
          <span className="text-2xl font-extrabold text-[#1769FF]">{featuredRes}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
            Pending Requests
          </span>
          <span className="text-2xl font-extrabold text-purple-700">{pendingRequests}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab('resources')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all px-2 ${
            activeTab === 'resources'
              ? 'border-[#1769FF] text-[#1769FF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Curated Resources ({resources.length})
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all px-2 flex items-center gap-1.5 ${
            activeTab === 'requests'
              ? 'border-[#1769FF] text-[#1769FF]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>User Resource Requests</span>
          {pendingRequests > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-extrabold">
              {pendingRequests}
            </span>
          )}
        </button>
      </div>

      {/* Resources Table */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Title &amp; Category</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Access</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resources.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={res.thumbnail}
                          alt={res.title}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <div className="font-bold text-[#07152E] line-clamp-1">{res.title}</div>
                          <span className="text-[11px] text-slate-500">
                            {res.category} • {res.subcategory}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">{res.resourceType}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          res.isFree
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {res.accessType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold text-[10px] uppercase ${
                          res.status === 'published'
                            ? 'bg-blue-50 text-[#1769FF]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {res.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {res.isFeatured ? (
                        <span className="text-amber-500 font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Yes</span>
                        </span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(res)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                          title="Edit Resource"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteResource(res.id, res.title)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                          title="Delete Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests Table */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          {requests.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              No user requests in queue. Requests submitted via /request will appear here in real-time.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Requester</th>
                    <th className="py-3.5 px-4">Requested Resource</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#07152E]">{req.name}</div>
                        <div className="text-[11px] text-slate-500">{req.email}</div>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#07152E]">{req.resourceName}</td>
                      <td className="py-3 px-4 text-slate-600">{req.resourceType}</td>
                      <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                        {req.description}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            req.status === 'fulfilled'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value)}
                          className="text-[11px] font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-review">In Review</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="declined">Declined</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Resource Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl my-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h2 className="text-xl font-bold text-[#07152E]">
                {editingResource ? 'Edit Resource' : 'Create New Curated Resource'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slug (URL friendly)</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated-if-empty"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="Courses & Learning">Courses &amp; Learning</option>
                    <option value="AI Resources">AI Resources</option>
                    <option value="Software & Tools">Software &amp; Tools</option>
                    <option value="Graphics & Design">Graphics &amp; Design</option>
                    <option value="Templates">Templates</option>
                    <option value="Video Editing & Reels">Video Editing &amp; Reels</option>
                    <option value="eBooks & Knowledge">eBooks &amp; Knowledge</option>
                    <option value="Methods, Tips & Resources">Methods, Tips &amp; Resources</option>
                    <option value="Digital Store">Digital Store</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Resource Type</label>
                  <select
                    value={form.resourceType}
                    onChange={(e) => setForm({ ...form, resourceType: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="Course">Course</option>
                    <option value="Tool">Tool</option>
                    <option value="AI Tool">AI Tool</option>
                    <option value="AI Prompt">AI Prompt</option>
                    <option value="AI Workflow">AI Workflow</option>
                    <option value="Template">Template</option>
                    <option value="Graphic">Graphic</option>
                    <option value="Video">Video</option>
                    <option value="eBook">eBook</option>
                    <option value="Guide">Guide</option>
                    <option value="Digital Product">Digital Product</option>
                    <option value="Bundle">Bundle</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    placeholder="e.g. Web Development"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thumbnail URL</label>
                  <input
                    type="url"
                    required
                    value={form.thumbnail}
                    onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">External / Official Link</label>
                  <input
                    type="url"
                    required
                    value={form.externalUrl}
                    onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={form.tagsString}
                    onChange={(e) => setForm({ ...form, tagsString: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Skill Level</label>
                  <select
                    value={form.skillLevel}
                    onChange={(e) => setForm({ ...form, skillLevel: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#1769FF]"
                  />
                  <label htmlFor="isFeatured" className="font-bold text-slate-700">
                    Feature on Home
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={form.isPremium}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isPremium: e.target.checked,
                        isFree: !e.target.checked,
                        accessType: e.target.checked ? 'Premium' : 'Free',
                      })
                    }
                    className="w-4 h-4 text-amber-600"
                  />
                  <label htmlFor="isPremium" className="font-bold text-slate-700">
                    Pro Store Item
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-[#1769FF] hover:bg-[#1254cc] text-white font-bold rounded-xl shadow-md transition-all"
                >
                  {actionLoading ? 'Saving...' : editingResource ? 'Save Changes' : 'Create & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
