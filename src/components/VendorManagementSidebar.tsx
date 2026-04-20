"use client";

import React from "react";
import { 
  X, 
  Calendar, 
  Star, 
  MessageCircle, 
  Phone 
} from "lucide-react";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
        />
      ))}
      <span className="text-[10px] text-gray-400 ml-1">({rating})</span>
    </div>
  );
}

export default function VendorSidebar({ vendor, onClose }: { vendor: any; onClose: () => void }) {
  if (!vendor) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-[460px] max-w-full bg-white z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 0.25s ease" }}
      >
        {/* HEADER */}
        <div className="flex items-start justify-between p-5 border-b bg-gray-50 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="font-bold text-gray-900 text-lg">{vendor.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${vendor.availability === "available" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-700"}`}>
                {vendor.availability}
              </span>
            </div>
            <p className="text-xs text-gray-500">{vendor.specialty}</p>
            <p className="text-xs text-gray-400 mt-0.5">{vendor.id}</p>
            <StarRow rating={vendor.rating || 0} />
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 text-gray-500 shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5" style={{ scrollbarWidth: "none" }}>

          {/* CONTACT */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Contact Information</p>
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 space-y-2 text-sm">
              {[["Phone", vendor.contact?.phone], ["Email", vendor.contact?.email], ["Address", vendor.contact?.address]].map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <span className="text-gray-400 w-16 shrink-0 text-xs">{k}:</span>
                  <span className="font-medium text-gray-700 text-xs">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CURRENT ORDERS */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Current Orders</p>
            <div className="space-y-2">
              {vendor.orders?.map((o: any) => (
                <div key={o.id} className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Calendar className="text-gray-400 w-3 h-3" /> Due: {o.due}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded font-medium
                    ${o.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                      o.status === "Ready" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* COST + PAYMENT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Cost Breakdown</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2 text-xs">
                {[["Labour", vendor.costBreakdown?.labour], ["Materials", vendor.costBreakdown?.materials], ["Overhead", vendor.costBreakdown?.overhead]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Payment</p>
              <div className="space-y-2 text-xs">
                <div className="bg-green-100 border border-green-200 rounded-lg p-2.5 flex justify-between items-center">
                  <span className="text-green-700 font-medium">Paid</span>
                  <span className="font-bold text-green-600">{vendor.paymentSummary?.totalPaid}</span>
                </div>
                <div className="bg-red-100 border border-red-200 rounded-lg p-2.5 flex justify-between items-center">
                  <span className="text-red-700 font-medium">Pending</span>
                  <span className="font-bold text-red-600">{vendor.paymentSummary?.pending}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PAYMENT HISTORY */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Payment History</p>
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm divide-y divide-gray-50">
              {vendor.paymentHistory?.map((p: any, i: number) => (
                <div key={i} className="flex justify-between items-center py-2 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{p.amount}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.date}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded font-semibold">{p.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* REVIEW */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-2">Vendor Review</p>
            <StarRow rating={vendor.review?.rating || 0} />
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">{vendor.review?.text}</p>
          </div>

        </div>

        {/* FOOTER ACTIONS */}
        <div className="border-t px-5 py-4 bg-white shrink-0">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${vendor.contact?.phone?.replace(/\D/g, '')}`, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </button>
            <button
              onClick={() => window.location.href = `tel:${vendor.contact?.phone}`}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>
    </>
  );
}
