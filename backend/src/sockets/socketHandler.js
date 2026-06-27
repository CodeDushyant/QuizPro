const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log(
      `Socket Connected: ${socket.id}`
    );

    // Student Join Exam Room
    socket.on(
      "joinExamRoom",
      (examCode) => {

        socket.join(examCode);

        console.log(
          `${socket.id} joined ${examCode}`
        );

      }
    );

    // Teacher Join Room
    socket.on(
      "teacherJoinRoom",
      (examCode) => {

        socket.join(examCode);

        console.log(
          `Teacher joined ${examCode}`
        );

      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          `Socket Disconnected: ${socket.id}`
        );

      }
    );

  });

};

module.exports = socketHandler;