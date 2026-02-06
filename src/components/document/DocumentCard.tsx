/**
 * Document Card Component
 * 
 * Displays documents in a card layout with blue header
 */

import { UIDocumentField } from '@/types/document';
import DocumentItem from './DocumentItem';

interface DocumentCardProps {
  documents: UIDocumentField[];
}

export default function DocumentCard({ documents }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#FFFBEB] overflow-hidden">
      {/* Card Header - Blue background with DOCUMENTS */}
      <div
        className="px-6 py-4 flex items-center gap-2"
        style={{
          background: 'linear-gradient(90deg, #136DEC 0%, #136DEC 100%)',
          borderBottom: '1px solid #0C4697',
        }}
      >
        {/* Document Icon */}
        <span className="material-icons text-white" style={{ fontSize: '20px' }}>
          folder_open
        </span>

        {/* Label */}
        <h3
          className="text-base font-bold text-white uppercase tracking-wider"
          style={{ letterSpacing: '0.4px' }}
        >
          Documents
        </h3>
      </div>

      {/* Document Items */}
      <div>
        {documents.map((document) => (
          <DocumentItem key={document.documentID} document={document} />
        ))}
      </div>
    </div>
  );
}
