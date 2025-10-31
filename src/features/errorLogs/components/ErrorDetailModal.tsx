"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ErrorLog } from "../types/errorLogs.types";
import { getErrorTypeColor, getSeverityColor, formatErrorDate, parseAdditionalData } from "../utils/errorLogsUtils";

interface ErrorDetailModalProps {
  errorLog: ErrorLog | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkReviewed: (id: number) => void;
  onDelete: (id: number) => void;
  isMarkingReviewed: boolean;
  isDeleting: boolean;
}

export default function ErrorDetailModal({
  errorLog,
  isOpen,
  onClose,
  onMarkReviewed,
  onDelete,
  isMarkingReviewed,
  isDeleting,
}: ErrorDetailModalProps) {
  const t = useTranslations("errorLogs");
  const [showStackTrace, setShowStackTrace] = useState(true);
  const [showAdditionalData, setShowAdditionalData] = useState(false);

  if (!isOpen || !errorLog) return null;

  const additionalDataParsed = parseAdditionalData(errorLog.additionalData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {t("details.title")} #{errorLog.id}
            </h2>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getErrorTypeColor(
                  errorLog.errorType,
                  errorLog.errorTypeName
                )}`}
              >
                {errorLog.errorTypeName}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                  errorLog.severity
                )}`}
              >
                {errorLog.severityName}
              </span>
              {errorLog.isReviewed ? (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                  {t("details.reviewed")}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-300">
                  {t("details.unreviewed")}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Error Message */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              {t("details.errorMessage")}
            </h3>
            <p className="text-black font-semibold">{errorLog.errorMessage}</p>
          </div>

          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-600 mb-1">{t("details.timestamp")}</p>
              <p className="text-sm font-semibold text-black">
                {formatErrorDate(errorLog.timestamp)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-bold text-gray-600 mb-1">{t("details.user")}</p>
              <p className="text-sm font-semibold text-black">
                {errorLog.userName}
              </p>
              {errorLog.userId && (
                <p className="text-xs text-gray-500 mt-1">{errorLog.userId}</p>
              )}
            </div>
            {errorLog.controllerName && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-600 mb-1">{t("details.controller")}</p>
                <p className="text-sm font-semibold text-black">
                  {errorLog.controllerName}
                </p>
                {errorLog.actionName && (
                  <p className="text-xs text-gray-500 mt-1">
                    {t("details.action")}: {errorLog.actionName}
                  </p>
                )}
              </div>
            )}
            {errorLog.requestPath && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-600 mb-1">{t("details.requestPath")}</p>
                <p className="text-sm font-semibold text-black">
                  {errorLog.requestMethod} {errorLog.requestPath}
                </p>
              </div>
            )}
            {errorLog.ipAddress && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-bold text-gray-600 mb-1">{t("details.ipAddress")}</p>
                <p className="text-sm font-semibold text-black">
                  {errorLog.ipAddress}
                </p>
              </div>
            )}
            {errorLog.userAgent && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 md:col-span-2">
                <p className="text-xs font-bold text-gray-600 mb-1">{t("details.userAgent")}</p>
                <p className="text-sm font-semibold text-black break-all">
                  {errorLog.userAgent}
                </p>
              </div>
            )}
          </div>

          {/* Stack Trace */}
          {errorLog.stackTrace && (
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white">
                  {t("details.stackTrace")}
                </h3>
                <button
                  onClick={() => setShowStackTrace(!showStackTrace)}
                  className="text-white hover:bg-white/20 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  {showStackTrace ? t("details.hide") : t("details.show")}
                </button>
              </div>
              {showStackTrace && (
                <pre className="text-xs text-green-400 font-mono overflow-x-auto whitespace-pre-wrap">
                  {errorLog.stackTrace}
                </pre>
              )}
            </div>
          )}

          {/* Inner Exception */}
          {errorLog.innerException && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-700 mb-2">
                {t("details.innerException")}
              </h3>
              <pre className="text-xs text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap">
                {errorLog.innerException}
              </pre>
            </div>
          )}

          {/* Additional Data */}
          {errorLog.additionalData && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-700">
                  {t("details.additionalData")}
                </h3>
                <button
                  onClick={() => setShowAdditionalData(!showAdditionalData)}
                  className="text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-lg text-xs font-bold transition-colors"
                >
                  {showAdditionalData ? t("details.hide") : t("details.show")}
                </button>
              </div>
              {showAdditionalData && (
                <pre className="text-xs text-gray-800 font-mono overflow-x-auto whitespace-pre-wrap">
                  {typeof additionalDataParsed === "string"
                    ? additionalDataParsed
                    : JSON.stringify(additionalDataParsed, null, 2)}
                </pre>
              )}
            </div>
          )}

          {/* Review Info */}
          {errorLog.isReviewed && errorLog.reviewedBy && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold text-gray-700 mb-1">
                {t("details.reviewedBy")}
              </p>
              <p className="text-sm font-semibold text-black">
                {errorLog.reviewedBy}
              </p>
              {errorLog.reviewedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatErrorDate(errorLog.reviewedAt)}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
          {!errorLog.isReviewed && (
            <button
              onClick={() => onMarkReviewed(errorLog.id)}
              disabled={isMarkingReviewed}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMarkingReviewed ? t("details.marking") : t("details.markReviewed")}
            </button>
          )}
          <button
            onClick={() => onDelete(errorLog.id)}
            disabled={isDeleting}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? t("details.deleting") : t("details.delete")}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg transition-colors"
          >
            {t("details.close")}
          </button>
        </div>
      </div>
    </div>
  );
}

