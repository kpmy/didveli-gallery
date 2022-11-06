import {ipcMain} from "electron";
import {DataSource} from "typeorm";
import {Room} from "../src/assets/model/room.schema";

const roomRepository = (AppDataSource: DataSource) => {
  const roomRepo = AppDataSource.getRepository(Room);

  ipcMain.on('get-rooms', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await roomRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('add-room', async (event: any, _room: Room) => {
    try {
      const room = await roomRepo.create(_room);
      await roomRepo.save(room);
      event.returnValue = await roomRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('delete-room', async (event: any, _room: Room) => {
    try {
      const room = await roomRepo.create(_room);
      await roomRepo.remove(room);
      event.returnValue = await roomRepo.find();
    } catch (err) {
      throw err;
    }
  });
}

module.exports = { roomRepository }
