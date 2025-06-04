'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  const popularTags = [
    'peking university',
    'tsinghua university', 
    // 'fudan university',
    // 'shanghai jiao tong'
  ];

  return (
    <section className={styles.heroSection}>
      {/* Background Image */}
      <div className={styles.backgroundContainer}>
        <Image
          src="/assets/image/HeaderBackground.png"
          alt="Students studying together"
          fill
          priority
          className={styles.backgroundImage}
        />
        <div className={styles.overlay}></div>
      </div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.leftContent}>
          {/* Main Title */}
          <div className={styles.mainTitle}>
            FIND THE UNIVERSITY
            <br />
            THAT SUITS YOU
          </div>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            UNLOCK YOUR LIFE ANSWER IN CHINA
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Enter the name of a university"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className={styles.searchButton}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.searchIcon}
                >
                  <path 
                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Search
              </button>
            </div>
          </form>

          {/* Popular Content */}
          <div className={styles.popularContent}>
            <span className={styles.popularLabel}>POPULAR CONTENT:</span>
            <div className={styles.popularTags}>
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  className={styles.popularTag}
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side background image area */}
        <div className={styles.rightContent}>
          {/* This area shows the background image */}
        </div>
      </div>
    </section>
  );
};

export default Hero; 