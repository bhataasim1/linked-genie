## Linked Genie - A LinkedIn Automation Tool

Linked Genie is a browser extension that automates the process of generating comments for LinkedIn posts by analyzing the content of the post. This tool helps users to engage more effectively on LinkedIn by providing relevant and thoughtful comments.

### Features
- Automatically generates comments for LinkedIn posts based on content analysis.
- Easy to install and use as a browser extension.
- Enhances user engagement on LinkedIn.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/bhataasim1/linked-genie.git
    ```
2. Navigate to the project directory:
    ```bash
    cd linked-genie
    ```
3. Install the necessary dependencies:
    ```bash
    pnpm install
    ```
4. Build the extension:
    ```bash
    pnpm run build
    ```
5. Load the extension in your browser:
    - Open your browser and go to the extensions page.
    - Enable "Developer mode".
    - Click on "Load unpacked" and select the `build/chrome-mv3-prod` folder from the project directory.

### Usage
1. Open LinkedIn and navigate to a post.
2. Click on the post comment.
3. You will see a "Genie" 🧞‍♂️ icon in the comment box. Click on the icon.
3. The extension will analyze the post content and generate a comment.
4. Review and edit the comment if necessary, then post it.

### Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

### License
This project is licensed under the MIT License.
