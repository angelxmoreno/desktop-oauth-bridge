# DesktopOAuthBridge

Securely manage OAuth 2.0 authentication for desktop and mobile applications. Bridge between apps and OAuth providers.

## Overview

DesktopOAuthBridge is an open-source project aimed at securely managing OAuth 2.0 authentication for desktop and mobile
applications. By acting as a bridge between apps and OAuth providers, it enables seamless and secure authorization
without storing sensitive information locally.

## Features

-   Securely manage OAuth 2.0 authentication for desktop and mobile apps.
-   Bridge between apps and OAuth providers.
-   Built with TypeScript and Express.js for flexibility and ease of use.

## Installation

1. clone the repo
    ```sh
    git clone https://github.com/angelxmoreno/desktop-oauth-bridge.git
    ```
2. copy the `sample.env` file, then add client ids and secrets
    ```sh
    cd desktop-oauth-bridge
    cp sample.env .env.local
    open .env.local
    ```

## Usage

Start the server and access the [available endpoints](#endpoints)

```sh
bun dev
```

## Endpoints

### Google

[Google OAuth 2.0 for TV and Limited-Input Device Applications](https://developers.google.com/identity/protocols/oauth2/limited-input-device)

-   /google/devices/code
-   /google/devices/token-with-user?device_code=[the device code]
-   /google/devices/token?device_code=[the device code] (deprecated)

## Contributing

We welcome contributions from the community! If you're interested in contributing to DesktopOAuthBridge, please see
our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

-   This project was inspired by the need for secure OAuth 2.0 authentication in desktop and mobile applications.
-   We thank the open-source community for their valuable contributions and support.

## Contact

For questions, feedback, or support, please contact [phpengineer123@gmail.com].
