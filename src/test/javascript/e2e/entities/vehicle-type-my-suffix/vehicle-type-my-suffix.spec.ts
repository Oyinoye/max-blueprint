import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VehicleTypeComponentsPage from './vehicle-type-my-suffix.page-object';
import VehicleTypeUpdatePage from './vehicle-type-my-suffix-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('VehicleType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vehicleTypeComponentsPage: VehicleTypeComponentsPage;
  let vehicleTypeUpdatePage: VehicleTypeUpdatePage;
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
    vehicleTypeComponentsPage = new VehicleTypeComponentsPage();
    vehicleTypeComponentsPage = await vehicleTypeComponentsPage.goToPage(navBarPage);
  });

  it('should load VehicleTypes', async () => {
    expect(await vehicleTypeComponentsPage.title.getText()).to.match(/Vehicle Types/);
    expect(await vehicleTypeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VehicleTypes', async () => {
    const beforeRecordsCount = (await isVisible(vehicleTypeComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vehicleTypeComponentsPage.table);
    vehicleTypeUpdatePage = await vehicleTypeComponentsPage.goToCreateVehicleType();
    await vehicleTypeUpdatePage.enterData();

    expect(await vehicleTypeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vehicleTypeComponentsPage.table);
    await waitUntilCount(vehicleTypeComponentsPage.records, beforeRecordsCount + 1);
    expect(await vehicleTypeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vehicleTypeComponentsPage.deleteVehicleType();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vehicleTypeComponentsPage.records, beforeRecordsCount);
      expect(await vehicleTypeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vehicleTypeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
