# iBussiness SaaS Application

![iBusiness](./src/assets/landing-page.png)

## Table of Content

- [Setup Instructions](#setup-instructions)
- [License](#license)

## Setup Instructions

1. Clone this repo to your local environment
2. cd to the ClientApp directory run `npm install` to download all the dependencies necessary to run the client application
3. At the root of the ClientApp create a file(if one does not exists) name it `.env.development.local` then copy these two lines into the file  
    > SSL_CRT_FILE=cert.crt  
    > SSL_KEY_FILE=cert.key

   i.e `cert.crt` and `cert.key` should exist in the ClientApp directory. To see where they are located run `explorer.exe .` in the terminal then press `enter`.

4. Create and checkout to a branch you'll be working at  

5. Run `npm start` or `npm run start` to start the ClientApp

## License

---

MIT License

Copyright (c) [2023] [Maurice Nganga]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
