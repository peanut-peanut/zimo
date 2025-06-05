'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const Footer = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleGetPlanClick = () => {
    // Handle get customized plan action
    console.log('Get Customized Application Plan clicked');
    // You can add email functionality or form opening logic here
  };

  const handleContactHover = () => {
    setShowContactPopup(true);
  };

  const handleContactLeave = () => {
    setShowContactPopup(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* 左侧版权信息 */}
        <div className={styles.copyright}>
          <span>©2022-2023 Zimo</span>
        </div>

        {/* 中间联系人信息 */}
        <div 
          className={styles.contactPerson}
          onMouseEnter={handleContactHover}
          onMouseLeave={handleContactLeave}
        >
          <span className={styles.helpText}>We are here to help:</span>
          <div className={styles.personInfo}>
            <div className={styles.avatar}>
              <span>M</span>
            </div>
            <span className={styles.personName}>Mia</span>
          </div>

          {/* 联系方式弹窗 */}
          {showContactPopup && (
            <div className={styles.contactPopup}>
              <div className={styles.popupContent}>
                <div className={styles.contactDetails}>
                  <div className={styles.popupHeader}>
                    <div className={styles.popupAvatar}>
                      <Image src="/assets/image/Avatar.jpg" alt="Mia" width={40} height={40} className={styles.avatarImage} />
                    </div>
                    <span className={styles.popupName}>Mia</span>
                  </div>
                  
                  <div className={styles.contactList}>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>WeChat：</span>
                      <span className={styles.contactValue}>Mia_Miaoao</span>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>WhatsApp/Phone：</span>
                      <span className={styles.contactValue}>+853 6570241</span>
                    </div>
                    <div className={styles.contactItem}>
                      <span className={styles.contactLabel}>Telegram：</span>
                      <span className={styles.contactValue}>+853 6570241</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.qrCodeSection}>
                  <div className={styles.qrCodeContainer}>
                    <Image
                      src="/assets/image/WhatsApp.png"
                      alt="WhatsApp QR Code"
                      width={100}
                      height={100}
                      className={styles.qrCodeImage}
                    />
                    <span className={styles.qrCodeLabel}>WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧按钮 */}
        <div className={styles.actionButton}>
          <button className={styles.planButton} onClick={handleGetPlanClick}>
            <Image 
              src="/assets/image/MailIcon.png" 
              alt="Email" 
              width={18} 
              height={18}
              className={styles.emailIcon}
            />
            <span>Get Customized Application Plan</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 