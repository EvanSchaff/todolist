-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(8) PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP    
);

-- List table
CREATE TABLE IF NOT EXISTS lists (
    list_id VARCHAR(10) PRIMARY KEY,
    user_id VARCHAR(8) REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(25) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    task_id VARCHAR(12) PRIMARY KEY,
    list_id VARCHAR(10) REFERENCES lists(list_id) ON DELETE CASCADE,
    task text NOT NULL,
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE  -- Fixed here
);

-- Blacklisted Tokens table
CREATE TABLE IF NOT EXISTS blacklisted_tokens (
    token TEXT PRIMARY KEY,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
