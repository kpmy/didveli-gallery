import {Service} from "../src/assets/model/service.schema";
import {ipcMain} from "electron";
import {DataSource} from "typeorm";

const serviceRepository = (AppDataSource: DataSource) => {
  const serviceRepo = AppDataSource.getRepository(Service);

  ipcMain.on('get-services', async (event: any, ...args: any[]) => {
    try {
      event.returnValue = await serviceRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('add-service', async (event: any, _service: Service) => {
    try {
      const service = await serviceRepo.create(_service);
      await serviceRepo.save(service);
      event.returnValue = await serviceRepo.find();
    } catch (err) {
      throw err;
    }
  });

  ipcMain.on('delete-service', async (event: any, _service: Service) => {
    try {
      const service = await serviceRepo.create(_service);
      await serviceRepo.remove(service);
      event.returnValue = await serviceRepo.find();
    } catch (err) {
      throw err;
    }
  });
}

module.exports = { serviceRepository }
