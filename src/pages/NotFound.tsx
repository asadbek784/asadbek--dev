import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="space-y-6">
        <AlertTriangle className="w-16 h-16 mx-auto" style={{ color: 'var(--rose)' }} />
        <h1 style={{
          fontFamily: '"Clash Display", sans-serif', fontWeight: 700,
          fontSize: '8rem', lineHeight: 1,
          background: 'linear-gradient(120deg, var(--acid), var(--indigo))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>404</h1>
        <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontSize: '1.5rem', color: '#fff', fontWeight: 600 }}>
          Page Not Found
        </h2>
        <p style={{ color: 'var(--text-2)', maxWidth: 360, margin: '0 auto' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button onClick={() => navigate('/')} className="btn-acid mx-auto" style={{ display: 'inline-flex' }}>
          Back Home
        </button>
      </motion.div>
    </div>
  );
}
