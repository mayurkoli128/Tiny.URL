# Tiny.URL
TinyURL is a URL shortening web service, which provides short aliases for redirection of long URLs.It takes a long link that may be many dozens of characters in length, and it turns it into a relatively tiny link (at most 6 character long.).

## Demo
![hippo](https://raw.githubusercontent.com/mayurkoli128/Tiny.URL/master/demo/ezgif.com-optimize.gif)

## Project Setup
Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.
#

### 1.) Install MongoDB.

 To run this project, you need to install the latest version of MongoDB Community Edition first.(Once install make sure it running properly.)
   * https://docs.mongodb.com/manual/installation/<br/>

### 2.) Clone the repository.
```bash
git clone https://github.com/mayurkoli128/Tiny.URL.git
```

### 3.) Change directory.
```bash
cd Tiny.URL
```

### 4.) Install Dependencies
```bash
npm install
```

### 5.) Start the Server.
```bash
npm start
```
This will launch the Node server on port 8080. If that port is busy, you can set a different port in config/default file (Eg: PORT=5000)

Open up your browser and head over to:

* http://localhost:8080/

### 6.) (Optional) Setting environment variables.
if you look at config/default.json, you'll see KEY'S. So, for security reasons, it should not be checked into the source control. I've set a default value here to make it easier for you to get up and running with this project. **For a production scenario, you should store this key as an environment variable.**
```
create .env file and store secrete key's here
```
 * Eg : DB_NAME = "XYZ" <br/>

## Contributing
*Any contribution or suggestion's most welcome.* 

**Steps for contribution**

  * **Fork** the repo on GitHub.
  * **Clone** the project to your own machine.
  * **Commit** changes to development branch.
  * **Push** your work back up to your fork.
  * **Submit** a Pull request so that I can review your changes.


# License
[MIT](https://choosealicense.com/licenses/mit/)

```diff
MIT License

Copyright (c) [2020] [Mayur Kishor Koli]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

-The above copyright notice and this permission notice shall be included in all 
-copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
