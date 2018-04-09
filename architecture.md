Needs to be able to run both in a browser, and also as a desktop app. The only
required platform for support is Windows. Of course, the browser version would
be automatically portable.

# Possible architectures
## Decomposable electron app
Node.js (probably express) wraps C++ server code and exposes web API. React (or
similar) presentation logic communicates via HTTP with this API.

In desktop mode, we provide an installer that first installs the electron app
(consisting of server and presentation) and then separately installs C++ model.
See https://github.com/electron/electron/issues/2438#issue-99455232 for 
discussion around embedding the C++ exe directly in the electron app; short 
version this isn't really supported.

In browser mode we run C++ and Node server on a machine at DIDE, plus an extra
bit (either extending the main server or adding another micro-server) to serve
up the HTML + JS for the single page app. How would we handle deployment? Don't
want to manage a Windows server, so probably Docker on Linux?

* Express should be fine, even under quite heavy load, as exec'ing out to the 
  C++ model will be a separate process. So single threading shouldn't pose a 
  problem
* Here, we are having to distribute a native C++ app, which gives us the 
  headache of compiling (and cross-compiling) the C++ code for multiple OS's, or
  at least architectures. :(

## ReactNative
???

## Docker
Build the following docker images:

* C++ model
* Web app that serves up single page app (e.g. like portals)
* Web app that provides API to runs instances of the model container. Can be 
  built with any tech - e.g. C#, Kotlin (potentially could be same container as 
  previous app)

In desktop mode, ask the user to go through these steps:

1. Install Docker for their OS (available for Windows, Mac, Linux) 
2. Download and run an 'installer'. This is a very small platform-specific
   script which just pulls down the images and creates a run script (e.g. on 
   desktop). On Windows it could be a small C# program. On Linux, a Bash script.

The run script just does `docker run` on the two webapp containers, and then
opens a browser pointing at the single page app.

In browser mode, run essentially the same setup and run script on the server.

* Server and desktop mode are basically identical ✓
* So long as we can get the C++ code to run in a docker container once, it will
  run anywhere ✓
* No need for us to build and maintain proper Windows installer ✓
* No need to keep up to date with new OS releases - the Docker installer does 
  that for us ✓
* Docker install is quite big (300MB on Windows), but this shouldn't be a 
  problem as first time users can interact via web client - it's only when they
  are prepping to go into the field that they need to download this.
* Unorthodox desktop app style - might cause some confusion
