import React from 'react';

interface TermsAndConditionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Terms & Conditions</h2>
        <div className="terms-content">
          <p>1. You must be at least 18 years old to use this service.</p>
          <p>2. You agree to provide accurate and complete information during the signup process.</p>
          <p>3. Your account is for personal use only and should not be shared with others.</p>
          <p>4. We reserve the right to suspend or terminate your account if you violate any terms.</p>
          <p>5. We are not responsible for any loss of data or unauthorized access to your account.</p>
          <p>6. You agree to receive promotional emails and updates from us.</p>
          <p>7. You can unsubscribe from our emails at any time.</p>
          <p>8. These terms may be updated from time to time, and you will be notified of any changes.</p>
          <p>9. By using our service, you agree to these terms and conditions.</p>
          <p>10. If you do not agree with any part of these terms, you should not use our service.</p>
        </div>
      </div>

      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          width: 24%;
          max-height: 90%;
          overflow-y: auto;
          position: relative;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 15px;
          cursor: pointer;
          font-size: 24px;
        }

        .terms-content {
          margin-top: 10px;
        }

        @media (max-width: 480px) {
          .modal-content {
            width: 400px;
            max-height: 80%;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditions;