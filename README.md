# About this repository

This is a small demo application made mostly to play around with `react`. The
app is mainly built using the following:

- [react](http://facebook.github.io/react/)
  - [react-router](https://github.com/rackt/react-router)
  - [react-bootstrap](http://react-bootstrap.github.io/)
- [socket.io](http://socket.io/)
- [express](http://expressjs.com/)

# Requirements

If you want to play around with the application and the code, you will require
the following:

- [node and npm](http://nodejs.org/)
- [bower](http://bower.io/)
- [gulp](http://gulpjs.com/)

Run the application straight up with `npm start` and navigate to
`localhost:3000`. You can change the port by specifying a `PORT` environmental
variable e.g. `PORT=1337 npm start`.

Run `gulp` to build to contents of `src` into `app/public`. Running the `gulp`
command will also rebuild the application if the contents of `src` change.
