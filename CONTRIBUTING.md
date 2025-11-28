# Contributing to Resumi - AI Resume Builder SaaS

We welcome contributions to the Resumi project! By contributing, you agree to abide by our Code of Conduct.

## Code of Conduct

Please review our Code of Conduct (link to be added) before contributing. We are committed to fostering an open and welcoming environment.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on our GitHub repository. When reporting a bug, please include:
- A clear and concise description of the bug.
- Steps to reproduce the behavior.
- Expected behavior.
- Actual behavior.
- Screenshots or video (if applicable).
- Your environment (OS, browser, Node.js version, etc.).

### Suggesting Enhancements

We love new ideas! Feel free to suggest enhancements by opening an issue. Please describe:
- The problem you're trying to solve.
- Your proposed solution.
- Any alternatives you've considered.

### Contributing Code

Follow these steps to contribute code:

1.  **Fork the repository.**
2.  **Clone your forked repository:**
    ```bash
    git clone <your-fork-url>
    cd ai-resume-builder
    ```
3.  **Set up local development:**
    Refer to the `IMPLEMENTATION.md` file for detailed instructions on how to set up the project locally, including Docker services, environment variables, and running migrations.
    ```bash
    # Example commands, see IMPLEMENTATION.md for full details
    docker compose up -d
    pnpm install
    pnpm db:migrate
    pnpm dev
    ```
4.  **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name-or-fix/your-fix-name
    ```
    (e.g., `feature/add-dark-mode` or `fix/button-styling`)
5.  **Make your changes:**
    Implement your feature or bug fix. Ensure your code adheres to the project's coding style and best practices.
6.  **Write Tests:**
    If you're adding new features or fixing bugs, please write appropriate unit and/or E2E tests.
    -   **Unit Tests:** Use Vitest (`pnpm test`).
    -   **E2E Tests:** Use Playwright (`pnpm test:e2e`).
7.  **Run checks:**
    Before committing, ensure your code passes linting and tests.
    ```bash
    pnpm lint
    pnpm test
    pnpm test:e2e
    ```
8.  **Commit your changes:**
    Write clear, concise commit messages. Follow the Conventional Commits specification (e.g., `feat: add user profile editing` or `fix: correct typo on login page`).
    ```bash
    git commit -m "feat: your commit message"
    ```
9.  **Push your branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
10. **Open a Pull Request (PR):**
    -   Go to the original repository on GitHub.
    -   You should see a prompt to open a PR from your branch.
    -   Provide a clear title and description for your PR, referencing any related issues.
    -   Ensure all automated checks pass.
    -   Be responsive to feedback during the review process.

### Code Style Guidelines

-   Follow standard TypeScript and React best practices.
-   Adhere to Prettier and ESLint rules (configured in the project).
-   Use Tailwind CSS for styling.
-   Components should be modular and reusable.

### Git Workflow

-   We use a feature-branch workflow.
-   All new features and bug fixes should be developed in separate branches.
-   Rebase your branch frequently with `main` to avoid merge conflicts.
-   Squash commits if your branch history is messy before opening a PR, but ensure meaningful commit messages are retained.

### Testing Requirements

-   All new features should have corresponding unit tests (Vitest).
-   Critical user flows should have E2E tests (Playwright).
-   Aim for high test coverage.

## Legal

By submitting contributions to Resumi, you grant [Your Company Name] a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute your contributions and such derivative works.

Thank you for contributing to Resumi!