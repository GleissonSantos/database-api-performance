# Database API Performance Testing

## Introduction

This project contains performance tests for a database API using k6, a modern load testing tool. The tests validate authentication endpoints and transaction operations, measuring response times, error rates, and system behavior under different load conditions.

The project is designed to ensure the API meets performance requirements and can handle expected traffic volumes while maintaining acceptable response times.

## Technologies Used

- **[k6](https://k6.io/)** - Open-source load testing tool for testing the performance of APIs, microservices, and websites
- **JavaScript (ES6+)** - Test scripting language
- **JSON** - Configuration and fixture data format

## Repository Structure

```
database-api-performance/
├── config/
│   └── config.local.json       # Local environment configuration
├── fixtures/
│   └── postLogin.json          # Test data for login requests
├── helpers/
│   └── autentication.js        # Authentication helper functions
├── tests/
│   ├── login.test.js           # Login endpoint performance tests
│   └── transferencias.test.js  # Transfer endpoint performance tests
├── utils/
│   └── variables.js            # Utility functions and environment variables
└── .gitignore                  # Git ignore rules
```

## Purpose of Each Directory

### `/config`
Contains configuration files for different environments. The `config.local.json` defines the base URL for the API under test.

**Purpose**: Centralize environment-specific configurations, making it easy to switch between different environments (local, staging, production).

### `/fixtures`
Stores test data in JSON format. The `postLogin.json` contains credentials used for authentication tests.

**Purpose**: Separate test data from test logic, making it easier to maintain and update test data without modifying test scripts.

### `/helpers`
Contains reusable helper functions. The `autentication.js` provides the `getAuthToken()` function to handle authentication and retrieve JWT tokens.

**Purpose**: Promote code reusability and maintain clean, DRY (Don't Repeat Yourself) test scripts by extracting common operations.

### `/tests`
Contains the actual k6 test scripts:
- `login.test.js` - Tests the login endpoint with load stages and validates authentication
- `transferencias.test.js` - Tests the transfer endpoint with authentication

**Purpose**: Organize performance test scenarios, including load patterns, thresholds, and validations.

### `/utils`
Utility functions used across tests. The `variables.js` provides the `getBaseUrl()` function to retrieve the base URL from environment variables or configuration files.

**Purpose**: Provide shared utility functions and handle environment variable management.

## Installation

### Prerequisites
- [k6](https://k6.io/docs/getting-started/installation/) installed on your system
- API server running locally on `http://localhost:3000` (or update the base URL in `config/config.local.json`)

### Installing k6

**macOS (using Homebrew):**
```bash
brew install k6
```

**Linux (Debian/Ubuntu):**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows (using Chocolatey):**
```bash
choco install k6
```

For other installation methods, visit the [official k6 documentation](https://k6.io/docs/getting-started/installation/).

### Clone the Repository
```bash
git clone https://github.com/GleissonSantos/database-api-performance.git
cd database-api-performance
```

## Running the Tests

### Basic Test Execution

**Run login tests:**
```bash
k6 run tests/login.test.js
```

**Run transfer tests:**
```bash
k6 run tests/transferencias.test.js
```

### Using Environment Variables

You can override the base URL using environment variables:

```bash
k6 run -e BASE_URL=https://api.example.com tests/login.test.js
```

### Real-Time Web Dashboard

k6 provides a web dashboard to monitor test execution in real-time with interactive charts and metrics.

**Enable web dashboard:**
```bash
K6_WEB_DASHBOARD=true k6 run tests/login.test.js
```

This will start a local web server at `http://127.0.0.1:5665` where you can view live test metrics.

### Exporting HTML Report

To export the dashboard as an HTML report after test completion:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run tests/login.test.js
```

**Note**: The test must run for at least 15-20 seconds to generate enough data for a meaningful report. If your test is too short, k6 will skip report generation with a warning message.

### Combined: Real-Time Dashboard + HTML Export

Run tests with both real-time monitoring and HTML export:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js
```

After the test completes, open `html-report.html` in your browser to view the detailed performance report.

### Additional Export Options

**JSON output:**
```bash
k6 run --out json=results.json tests/login.test.js
```

**CSV output:**
```bash
k6 run --out csv=results.csv tests/login.test.js
```

**Cloud output (k6 Cloud):**
```bash
k6 run --out cloud tests/login.test.js
```

## Test Configuration

### Login Test (`login.test.js`)
- **Load Pattern**: Ramp-up load test with multiple stages
  - 10 VUs for 10 seconds
  - 10 VUs for 20 seconds
  - 30 VUs for 10 seconds
  - 30 VUs for 20 seconds
  - Ramp-down to 0 VUs in 20 seconds
- **Thresholds**:
  - 90th percentile response time < 3000ms
  - Maximum response time < 5000ms
  - Error rate < 1%

### Transfer Test (`transferencias.test.js`)
- **Load Pattern**: Single iteration
- **Validations**:
  - HTTP status 201 (Created)
  - Successful transaction response

## Contributing

Feel free to open issues or submit pull requests with improvements.

## License

This project is available for educational and testing purposes.

---

**Repository**: [https://github.com/GleissonSantos/database-api-performance](https://github.com/GleissonSantos/database-api-performance)
