🚧 Common Jenkins Pipeline Stages
Checkout

Retrieve the latest code from the source control management (SCM) system.​

Install Dependencies

Install all necessary project dependencies.​

Lint

Analyze code for syntax errors and enforce coding standards.​

Build

Compile the source code and prepare artifacts.​

Test

Execute automated tests to validate code functionality.​
Baeldung
+1
Jenkins
+1

Package

Bundle the application into deployable units (e.g., JAR, WAR, Docker image).​

Static Analysis

Perform code quality checks using tools like SonarQube.​

Security Scan

Scan for vulnerabilities using tools like OWASP Dependency-Check.​

Docker Build & Push

Build a Docker image and push it to a container registry.​

Deploy to Staging

Deploy the application to a staging environment for further testing.

Integration Tests

Run tests that verify the integration between different system components.

Manual Approval

Pause the pipeline and wait for manual approval before proceeding.

Deploy to Production

Deploy the application to the production environment.

Post-Deployment Verification

Perform checks to ensure the deployment was successful.

Cleanup

Clean up temporary files and resources used during the pipeline execution.
