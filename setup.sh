#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting project setup...${NC}"

# Create necessary directories
echo -e "${YELLOW}Creating project directories...${NC}"
mkdir -p generated
mkdir -p uploads
mkdir -p logs

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cat > .env << EOF
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/your_database_name

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

# OpenAI Configuration
OPEN_AI_KEY=your_openai_api_key

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
EOF
    echo -e "${GREEN}.env file created. Please update it with your actual credentials.${NC}"
else
    echo -e "${YELLOW}.env file already exists. Skipping creation.${NC}"
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

# Set proper permissions
echo -e "${YELLOW}Setting directory permissions...${NC}"
chmod 755 generated
chmod 755 uploads
chmod 755 logs

# Create MongoDB indexes (if mongoose is being used)
echo -e "${YELLOW}Setting up database indexes...${NC}"
node << EOF
const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

async function createIndexes() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Add your indexes here if needed
        // Example: await YourModel.collection.createIndex({ field: 1 });
        
        console.log('Indexes created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating indexes:', error);
        process.exit(1);
    }
}

createIndexes();
EOF

# Final instructions
echo -e "${GREEN}Setup completed!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update the .env file with your actual credentials"
echo "2. Make sure MongoDB is running"
echo "3. Start the application with 'npm start'"
echo -e "${GREEN}Happy coding!${NC}"

# Make the script executable
chmod +x setup.sh
