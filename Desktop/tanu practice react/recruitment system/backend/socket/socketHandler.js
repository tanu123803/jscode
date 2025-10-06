export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinBoard", (boardId) => socket.join(boardId));

    
    socket.on("taskUpdated", (boardId, updatedTask) => {
      io.to(boardId).emit("taskUpdated", updatedTask);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
  });
};
