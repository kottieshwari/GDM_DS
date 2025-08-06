import { test, expect } from '@playwright/test';
import { generateUEntityIds } from '../utils/newId';
import { waitForRecordInDb } from '../utils/newId';
import * as dotenv from 'dotenv';
import {
  label,
  severity,
  feature,
  epic,
} from 'allure-js-commons';

import { LoginPage } from '../pages/LoginPage';
import { SimulatorPage } from '../pages/SimulatorPage';
import { LocationPage } from '../pages/LocationPage';
import { DevicePage } from '../pages/DevicePage';
import { RelationshipPage } from '../pages/RelationshipPage';
import { HesSimulatorPage } from '../pages/HesSimulatorPage';
import { ResultPage } from '../pages/ResultPage';
import { startDate, testConfig } from '../utils/testdata';

dotenv.config();
test.setTimeout(120000);


function generateIdsForSet(offset: number) {
  return {
    locationId: generateUEntityIds('LOC', 1, offset)[0],
    deviceId: generateUEntityIds('DEV', 1, offset)[0],
    relationId: generateUEntityIds('RDL', 1, offset)[0],
    deviceRegisterId: generateUEntityIds('RDR', 1, offset)[0]
  };
}

test.describe.parallel('Parallel Location-Device Creation & Verification', () => {
  for (let i = 0; i < testConfig.numberOfSets; i++) {
    const offset = testConfig.offsetStart + i;
    const { locationId, deviceId, relationId, deviceRegisterId } = generateIdsForSet(offset);

    test(`Set ${i + 1}: Create Location, Device, and Relationships`, async ({ page }) => {
      const login = new LoginPage(page);
      const simulator = new SimulatorPage(page);
      const location = new LocationPage(page);
      const device = new DevicePage(page);
      const relation = new RelationshipPage(page);
      const hes = new HesSimulatorPage(page);
      const result = new ResultPage(page);

      await page.goto(process.env.SIMULATOR_UI!);
      await login.login(process.env.SIMULATOR_USER!, process.env.SIMULATOR_PASSWORD!);
      await simulator.openSimulator('CIS Simulator');
      await simulator.navigateTo(' Master Data');

      await location.createLocation(locationId, startDate);
      const locationResult = await waitForRecordInDb(
        'SELECT * FROM d_location WHERE location_id = $1',
        [locationId],
        60000
      );
      console.log('Location DB result:', locationResult);
      expect(locationResult).toHaveLength(1);

      await device.createDevice(deviceId, startDate);

      const deviceResult = await waitForRecordInDb(
        'SELECT * FROM d_device WHERE device_id = $1',
        [deviceId],
        60000
      );
      console.log('Device DB result:', deviceResult);
      expect(deviceResult).toHaveLength(1);


      //expect(await waitForRecordInDb('SELECT * FROM d_location WHERE location_id = $1', [locationId], 15000)).toHaveLength(1);
      //expect(await waitForRecordInDb('SELECT * FROM d_device WHERE device_id = $1', [deviceId], 15000)).toHaveLength(1);




      await relation.createDeviceLocationRelation(relationId, deviceId, locationId, startDate);
      await relation.createRegisterGroupRelation(deviceRegisterId, deviceId, startDate);

      await expect(page.locator('div.p-toast-message-text', { hasText: 'Relationship saved successfully.' })).toBeVisible();

      //expect(await waitForRecordInDb('SELECT * FROM r_device_location WHERE device_location_id = $1', [relationId], 15000)).toHaveLength(1);
      //expect(await waitForRecordInDb('SELECT * FROM gdm.r_device_channel WHERE device_id = $1', [deviceId], 20000)).toHaveLength(4);

      const relationResult = await waitForRecordInDb(
        'SELECT * FROM r_device_location WHERE device_location_id = $1',
        [relationId],
        60000
      );
      console.log(`Relation created: ${relationId}`, relationResult);
      expect(relationResult).toHaveLength(1);

      const deviceChannelResult = await waitForRecordInDb(
        'SELECT * FROM gdm.r_device_channel WHERE device_id = $1',
        [deviceId],
        60000
      );
      console.log(`Device channels found: ${deviceId}`, deviceChannelResult);
      expect(deviceChannelResult).toHaveLength(4);



      await hes.generateReads(deviceId, startDate);
      await expect(page.locator('div.p-toast-message-text', { hasText: 'Request Processed Successfully.' })).toBeVisible();
      await page.waitForTimeout(10000);
      
      await page.goto(process.env.RESULT_UI!);
      await login.login(process.env.RESULT_USER!, process.env.RESULT_PASSWORD!);
      await result.searchDevice(locationId);

      console.log(`Completed Set ${i + 1}: ${locationId}`);
    });
  }
});


///npx allure generate ./allure-results --clean -o ./allure-report
//npx allure open ./allure-report