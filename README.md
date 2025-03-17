# Engineering Tools Platform

A comprehensive suite of tools for engineering professionals, specializing in electrical testing and commissioning documentation.

## Features

The platform includes several specialized features to streamline engineering workflows:

### 1. PDF Extractor

Automatically extract relay settings and other technical data from PDF documents:

- **OCR Processing**: Extract text and structured data from PDF files
- **Validation**: Verify extracted data with confidence scores
- **Data Mapping**: Map extracted settings to standardized formats
- **Preview**: Review extracted data before saving
- **Supported relay types**: Differential, Distance, Overcurrent, Earth Fault, and Motor Protection

### 2. Report Generator

Create standardized testing and commissioning reports:

- **Multiple Templates**: Includes General Testing Report and specialized Relay Testing Report
- **Form-based Input**: Structured data entry with validation
- **Equipment Management**: Track testing equipment used in commissioning
- **Witnesses & Signatures**: Capture approval signatures
- **Export to DOCX**: Generate professional Word documents
- **Auto-save Drafts**: Never lose work with automatic draft saving

### 3. Document Library

Centralized management of all generated reports and processed PDFs:

- **Advanced Filtering**: Filter by document type, category, and more
- **Sorting Options**: Sort by name, date, size, or creator
- **Search**: Full-text search across document names and metadata
- **Download**: Retrieve documents for offline use
- **Delete Protection**: Confirmation dialogs to prevent accidental deletion

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/engineering-tools.git
   cd engineering-tools
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit the `.env.local` file with your specific configuration.

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Deployment

### Build for Production

```bash
pnpm build
```

### Deployment Options

#### Option 1: Vercel (Recommended)

The easiest way to deploy the application is using Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

#### Option 2: Docker

A Dockerfile is provided for containerized deployment:

1. Build the Docker image:
   ```bash
   docker build -t engineering-tools .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e DATABASE_URL=your_db_url engineering-tools
   ```

#### Option 3: Traditional Hosting

For traditional hosting environments:

1. Build the application:
   ```bash
   pnpm build
   ```

2. Start the production server:
   ```bash
   pnpm start
   ```

### Environment Configuration

The following environment variables should be set in production:

- `DATABASE_URL`: Connection string for your database
- `NEXTAUTH_URL`: The canonical URL of your website
- `NEXTAUTH_SECRET`: Secret used for JWT encryption
- `STORAGE_PROVIDER`: Set to 'local', 's3', or 'azure' for document storage
- `S3_BUCKET_NAME`: (If using S3) Bucket name for document storage
- `S3_REGION`: (If using S3) AWS region

## Performance Considerations

For optimal performance in production:

1. **Database Indexing**: Ensure proper indexes on frequently queried fields
2. **Caching Strategy**: Implement Redis caching for frequently accessed data
3. **Image Optimization**: Use the Next.js Image component for all images
4. **API Rate Limiting**: Implement rate limiting on public API endpoints

## Security Considerations

1. **Authentication**: The application uses NextAuth.js for secure authentication
2. **Data Validation**: All inputs are validated using Zod schemas
3. **File Validation**: Strict file type and size validation
4. **CORS Policy**: Restrictive CORS policy for API routes
5. **Content Security Policy**: Implemented using Helmet middleware

## Monitoring and Maintenance

1. **Error Logging**: Integration with Sentry for error tracking
2. **Analytics**: Optional integration with Google Analytics or Plausible
3. **Health Checks**: API endpoint for system health monitoring

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact support@your-organization.com or open an issue on GitHub.
