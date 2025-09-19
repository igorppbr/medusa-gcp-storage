<p align="center">
  <a href="https://cloud.google.com">
    <picture>
      <img alt="Google Cloud logo" src="https://www.gstatic.com/cgc/google-cloud-logo.svg" width="260"/>
    </picture>
  </a>
</p>
<h1 align="center">
  Google Cloud Storage Integration for Medusa v2
</h1>

<h4 align="center">
  <a href="https://cloud.google.com/storage/docs">Documentation</a> |
  <a href="https://cloud.google.com/storage/docs/how-to/creating-buckets">Google Cloud Console</a>
</h4>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://www.linkedin.com/in/igor-ludgero-miura-26175263/">
    <img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-blue?logo=linkedin" alt="Follow me on LinkedIn" />
  </a>
</p>

## Introduction

This module integrates Google Cloud Storage as a file provider for Medusa v2. It allows you to store, serve, and manage files (such as images, documents, and import/export files) directly in a Google Cloud Storage bucket from your Medusa store.

With this plugin, you can:

- Store product images and other assets in Google Cloud Storage.
- Control file access (public/private) at the object level.
- Use the same bucket for both public and private files.

## Compatibility

This module/plugin is compatible with versions >= 2.4.0 of `@medusajs/medusa`.

## Google Cloud Storage Bucket Configuration

**Important:**  
Your Google Cloud Storage bucket must be created with **Access control** set to **Fine-grained**. This is required because:

- Some files (like product images) need to be public.
- Other files (like import/export data) must remain private.
- Fine-grained access control allows you to set permissions at the individual file (object) level, so you can mix public and private files in the same bucket.

**Do not enable "Enforce public access prevention"** on the bucket. This setting must be disabled to allow public files to be accessible when needed.

For more details, see [Google Cloud Storage Access Control](https://cloud.google.com/storage/docs/access-control).

## Service Account Setup

To allow Medusa to access your Google Cloud Storage bucket, you need to create a dedicated **service account** and generate a JSON key for it. This service account will be used by Medusa to upload, update, delete files, and manage their visibility in your bucket.

### Steps to Create a Service Account and JSON Key

1. **Go to the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).**
2. **Create a new service account** (or select an existing one).
3. **Grant the following roles to the service account:**
  - `Storage Object Admin` (`roles/storage.objectAdmin`):  
    This role allows the service account to create, update, delete, and manage the access control of objects in the bucket.
4. **Create and download a JSON key** for the service account:
  - In the service account details, go to the "Keys" tab.
  - Click "Add Key" > "Create new key" > select "JSON" > "Create".
  - Download and securely store the JSON key file.

> **Important:**  
> Never commit your service account JSON key to version control. Treat it as a secret.

You will use the contents of this JSON key in your Medusa configuration as shown in the [Installation](#installation) section above.


## Installation

1. **Install the package**

```bash
npm install @igorppbr/medusa-v2-gcp-file-provider
```

2. **Add the module to your `medusa-config.ts`**

```ts
   {
    modules: [
      {
        resolve: "@medusajs/medusa/file",
        options: {
          providers: [
            {
              resolve: "@igorppbr/medusa-v2-gcp-file-provider",
              options: {
                debug: true, // Show debug logs
                bucketName: "medusatest", // The name of the bucket in Google Cloud Storage
                serviceAccountKey: { // The service account key for Google Cloud Storage
                  "type": "service_account",
                  "project_id": "your-project-id",
                  "private_key_id": "***************",
                  "private_key": "-----BEGIN PRIVATE KEY-----\n***************\n-----END PRIVATE KEY-----\n",
                  "client_email": "your-service-account@your-project-id.iam.gserviceaccount.com",
                  "client_id": "***************",
                  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                  "token_uri": "https://oauth2.googleapis.com/token",
                  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account@your-project-id.iam.gserviceaccount.com"
                }
              },
            }
          ]
        }
    }
  ]
}
```

   > **Note:** Replace the credentials above with your own service account key. Never commit your real credentials to version control.

## Usage

Once configured, Medusa will use Google Cloud Storage for file uploads and downloads. You can control the access level (public/private) for each file as needed.

## Contributing

We welcome contributions to this project! If you have suggestions, improvements, or bug fixes, please follow these steps:

1. **Fork the Repository**  
   Create a personal copy of the repository by forking it on GitHub.

2. **Create a New Branch**  
   Create a new branch for your changes:
   ```bash
   git checkout -b my-feature-branch
   ```

3. **Make Your Changes**  
   Implement your changes in the codebase.

4. **Test Your Changes**  
   Ensure that your changes work as expected and do not break existing functionality.

5. **Submit a Pull Request**  
   Push your changes to your forked repository and submit a pull request to the main repository.

## Support / Contact

If you need help or have questions about the Google Cloud Storage Integration, please reach out to us:

- **Email:** igorlmiura@gmail.com
- **GitHub Issues:** [Submit an issue](https://github.com/igorppbr/medusa-gcp-storage/issues)
