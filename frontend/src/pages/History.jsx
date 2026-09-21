import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History as HistoryIcon,
  Search,
  Filter,
  ArrowRight,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Trash2,
  QrCode,
  Calendar,
  X,
  ShieldCheck,
} from 'lucide-react';
import { useDietary } from '../context/DietaryContext';

export default function History() {
  const { history, clearHistory, setActiveResultKey } = useDietary();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedScanModal, setSelectedScanModal] = useState(null);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dietaryProfile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryWarning.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'unsafe':
        return {
          bg: 'bg-[#C93B2B]/10 text-[#C93B2B] border-[#C93B2B]/30',
          icon: XCircle,
        };
      case 'caution':
        return {
          bg: 'bg-[#C68B59]/15 text-[#C68B59] border-[#C68B59]/30',
          icon: AlertTriangle,
        };
      case 'safe':
        return {
          bg: 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30',
          icon: CheckCircle2,
        };
      default:
        return {
          bg: 'bg-[#362211]/10 text-[#362211] border-[#362211]/20',
          icon: HistoryIcon,
        };
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#362211]/10 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#2E7D32]/10 border border-[#2E7D32]/20 flex items-center justify-center text-[#2E7D32]">
              <HistoryIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#362211]">
              Scan History
            </h1>
          </div>
          <p className="text-sm text-[#362211]/70 mt-1">
            Your recent product scans and allergen safety verifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              type="button"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#362211]/70 hover:text-[#C93B2B] hover:bg-[#C93B2B]/10 border border-[#362211]/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
          <Link
            to="/scanner"
            className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-[#256629] transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>New Scan</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#362211]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scans by product, brand, or allergen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#362211]/15 text-sm text-[#362211] placeholder:text-[#362211]/45 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 transition-all shadow-xs"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 bg-[#F4F6F5] p-1 rounded-2xl border border-[#362211]/10 overflow-x-auto">
          {['all', 'unsafe', 'caution', 'safe'].map((status) => {
            const isSelected = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#362211] text-white shadow-xs'
                    : 'text-[#362211]/70 hover:text-[#362211] hover:bg-white'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scan History Items List */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#F4F6F5] border border-[#362211]/10 space-y-4">
          <HistoryIcon className="w-10 h-10 text-[#362211]/30 mx-auto" />
          <h3 className="text-base font-bold text-[#362211]">
            No scan records found
          </h3>
          <p className="text-xs text-[#362211]/65 max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'all'
              ? 'Try changing your search keywords or status filter.'
              : 'Scan your first grocery product label to start building your dietary history.'}
          </p>
          <Link
            to="/scanner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#256629] transition-all"
          >
            <QrCode className="w-4 h-4" />
            <span>Start Scanning</span>
          </Link>
        </div>
      ) : (
        <motion.div layout className="space-y-3.5">
          {filteredHistory.map((item, index) => {
            const badge = getStatusBadge(item.status);
            const StatusIcon = badge.icon;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                key={item.id}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-[#362211]/10 hover:border-[#362211]/25 hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#F4F6F5] border border-[#362211]/10 shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-[#362211]">
                        {item.productName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${badge.bg}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span>{item.status}</span>
                      </span>
                    </div>

                    <p className="text-xs text-[#362211]/75 line-clamp-1">
                      {item.primaryWarning}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-[#362211]/60 pt-0.5">
                      <span className="font-semibold text-[#2E7D32]">
                        {item.dietaryProfile}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C68B59]" />
                        <span>{item.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-end gap-2 border-t sm:border-t-0 border-[#362211]/8 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedScanModal(item)}
                    className="px-4 py-2 rounded-xl bg-[#F4F6F5] hover:bg-white border border-[#362211]/12 text-xs font-bold text-[#362211] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View Result</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C68B59]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* History Detail Modal */}
      <AnimatePresence>
        {selectedScanModal && (
          <div className="fixed inset-0 z-50 bg-[#362211]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#362211]/15 shadow-2xl space-y-5 relative"
            >
              <button
                onClick={() => setSelectedScanModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#362211]/60 hover:text-[#362211] hover:bg-[#F4F6F5] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#362211]/15">
                  <img
                    src={selectedScanModal.thumbnail}
                    alt={selectedScanModal.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#362211]">
                    {selectedScanModal.productName}
                  </h3>
                  <p className="text-xs text-[#362211]/60">
                    Scanned {selectedScanModal.timestamp}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F4F6F5] border border-[#362211]/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#362211]/70">Checked against:</span>
                  <span className="text-[#2E7D32]">
                    {selectedScanModal.dietaryProfile}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#362211]/70">Analysis status:</span>
                  <span
                    className={
                      selectedScanModal.status === 'Unsafe'
                        ? 'text-[#C93B2B]'
                        : 'text-[#2E7D32]'
                    }
                  >
                    {selectedScanModal.status}
                  </span>
                </div>
                <p className="text-xs text-[#362211]/85 pt-1 border-t border-[#362211]/8">
                  {selectedScanModal.primaryWarning}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  to="/scanner"
                  onClick={() => setSelectedScanModal(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#256629] text-white text-xs font-bold text-center transition-all"
                >
                  Scan This Again
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedScanModal(null)}
                  className="py-3 px-4 rounded-xl bg-[#F4F6F5] hover:bg-white border border-[#362211]/15 text-xs font-bold text-[#362211] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
