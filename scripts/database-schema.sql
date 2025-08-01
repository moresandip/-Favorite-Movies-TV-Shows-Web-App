-- Create database
CREATE DATABASE IF NOT EXISTS movies_tv_db;
USE movies_tv_db;

-- Create movies_tv_shows table
CREATE TABLE IF NOT EXISTS movies_tv_shows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    type ENUM('Movie', 'TV Show') NOT NULL,
    director VARCHAR(255) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    year_time VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    description TEXT,
    video_url TEXT,
    language VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title (title),
    INDEX idx_original_title (original_title),
    INDEX idx_type (type),
    INDEX idx_director (director),
    INDEX idx_language (language),
    INDEX idx_country (country),
    INDEX idx_year_time (year_time)
);
