import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleComponentsPage from './vehicle-my-suffix.page-object';
import VehicleUpdatePage from './vehicle-my-suffix-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Vehicle e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleComponentsPage: VehicleComponentsPage;
  let vehicleUpdatePage: VehicleUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    vehicleComponentsPage = new VehicleComponentsPage();
    vehicleComponentsPage = await vehicleComponentsPage.goToPage(navBarPage);
  });

  it('should load Vehicles', async () => {
    expect(await vehicleComponentsPage.title.getText()).to.match(/Vehicles/);
    expect(await vehicleComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Vehicles', async () => {
    const beforeRecordsCount = (await isVisible(vehicleComponentsPage.noRecords)) ? 0 : await getRecordsCount(vehicleComponentsPage.table);
    vehicleUpdatePage = await vehicleComponentsPage.goToCreateVehicle();
    await vehicleUpdatePage.enterData();

    expect(await vehicleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleComponentsPage.table);
    await waitUntilCount(vehicleComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleComponentsPage.deleteVehicle();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleComponentsPage.records, beforeRecordsCount);
      expect(await vehicleComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
