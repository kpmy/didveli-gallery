import {app, BrowserWindow, ipcMain, screen} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {DataSource} from "typeorm";
import {Service} from "../src/assets/model/service.schema";
import {Room} from "../src/assets/model/room.schema";
import {Client} from "../src/assets/model/client.schema";

// const {serviceRepository} = require("./serviceRepository");
// const {roomRepository} = require("./roomRepository");

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const AppDataSource = new DataSource({
    type: 'sqlite',
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    database: './src/assets/data/database.sqlite',
    entities: [ Client, Service, Room ],
  });

  AppDataSource.initialize()
    .then(() => {
      // here you can start to work with your database
      // serviceRepository(AppDataSource);
      // roomRepository(AppDataSource);

      const clientRepo = AppDataSource.getRepository(Client);

      ipcMain.on('get-clients', async (event: any, _skip: number, _take: number) => {
        try {
          event.returnValue = await clientRepo.createQueryBuilder("client").skip(_skip).take(_take).getMany();
        } catch (err) {
          throw err;
        }
      });

      ipcMain.on('add-client', async (event: any, _client: Client) => {
        try {
          const client = await clientRepo.create(_client);
          await clientRepo.save(client);
          event.returnValue = await clientRepo.find();
        } catch (err) {
          throw err;
        }
      });

      ipcMain.on('delete-client', async (event: any, _client: Client) => {
        try {
          const client = await clientRepo.create(_client);
          await clientRepo.remove(client);
          event.returnValue = await clientRepo.find();
        } catch (err) {
          throw err;
        }
      });

      ipcMain.on('count-clients', async (event: any, ...args: any[]) => {
        try {
          event.returnValue = await clientRepo.count();
        } catch (err) {
          throw err;
        }
      });

      const serviceRepo = AppDataSource.getRepository(Service);

      ipcMain.on('get-services', async (event: any, _skip: number, _take: number) => {
        try {
          event.returnValue = await serviceRepo.createQueryBuilder("service").skip(_skip).take(_take).getMany();
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

      ipcMain.on('count-services', async (event: any, ...args: any[]) => {
        try {
          event.returnValue = await serviceRepo.count();
        } catch (err) {
          throw err;
        }
      });

      const roomRepo = AppDataSource.getRepository(Room);

      ipcMain.on('get-rooms', async (event: any, _skip: number, _take: number) => {
        try {
          event.returnValue = await roomRepo.createQueryBuilder("room").skip(_skip).take(_take).getMany();
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

      ipcMain.on('count-rooms', async (event: any, ...args: any[]) => {
        try {
          event.returnValue = await roomRepo.count();
        } catch (err) {
          throw err;
        }
      });
    })
    .catch((error) => console.log(error))

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
